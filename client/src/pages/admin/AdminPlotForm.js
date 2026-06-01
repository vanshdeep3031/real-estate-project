import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../utils/api";
import toast from "react-hot-toast";

const inputStyle = {
  width: "100%", padding: "11px 14px", border: "1px solid #ddd",
  borderRadius: "2px", fontSize: "0.95rem", background: "#fff",
  boxSizing: "border-box", fontFamily: "'DM Sans', sans-serif",
};
const labelStyle = {
  display: "block", fontSize: "0.78rem", fontWeight: 600,
  letterSpacing: "0.06em", textTransform: "uppercase", color: "#7a7568", marginBottom: "0.4rem",
};

// Helper to compress images using HTML Canvas before upload
const compressImage = (file, maxWidth = 1200, maxHeight = 1200, quality = 0.7) => {
  return new Promise((resolve) => {
    // Only compress image files
    if (!file.type.startsWith("image/")) {
      resolve(file);
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              resolve(file);
              return;
            }
            const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".jpg", {
              type: "image/jpeg",
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          },
          "image/jpeg",
          quality
        );
      };
      img.onerror = () => resolve(file);
    };
    reader.onerror = () => resolve(file);
  });
};

export default function AdminPlotForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "", location: "", price: "", size: "", type: "Residential",
    description: "", status: "Available", featured: false,
  });
  const [files, setFiles] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEdit) {
      api.get(`/plots/${id}`).then(r => {
        const { images, ...rest } = r.data;
        setForm({ ...rest, featured: rest.featured || false });
        setExistingImages(images || []);
      }).catch(() => toast.error("Failed to load plot"));
    }
  }, [id, isEdit]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleFiles = async (e) => {
    const selected = Array.from(e.target.files);
    if (selected.length === 0) return;

    // Show previews immediately using original files so the UI is responsive
    setPreviews(selected.map(f => URL.createObjectURL(f)));

    const loadingToast = toast.loading("Compressing and optimizing images...");
    try {
      const compressedFiles = await Promise.all(
        selected.map(file => compressImage(file))
      );
      setFiles(compressedFiles);
      toast.success("Images compressed and ready!", { id: loadingToast });
    } catch (err) {
      setFiles(selected);
      toast.error("Failed to compress some images, using originals", { id: loadingToast });
    }
  };

  const removeExistingImage = (url) => {
    setExistingImages(prev => prev.filter(i => i !== url));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      fd.append("keepImages", JSON.stringify(existingImages));
      files.forEach(f => fd.append("images", f));

      if (isEdit) {
        await api.put(`/plots/${id}`, fd, { headers: { "Content-Type": "multipart/form-data" } });
        toast.success("Plot updated!");
      } else {
        await api.post("/plots", fd, { headers: { "Content-Type": "multipart/form-data" } });
        toast.success("Plot added!");
      }
      navigate("/admin/plots");
    } catch (err) {
      toast.error(err.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: "800px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
        <button onClick={() => navigate("/admin/plots")} style={{ background: "none", border: "1px solid #ddd", padding: "8px 14px", borderRadius: "2px", cursor: "pointer", color: "#7a7568" }}>← Back</button>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem" }}>{isEdit ? "Edit Plot" : "Add New Plot"}</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ background: "#fff", borderRadius: "4px", padding: "2rem", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", marginBottom: "1.5rem" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", marginBottom: "1.5rem", color: "#7a7568" }}>Basic Information</h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem" }}>
            <div style={{ gridColumn: "1/-1" }}>
              <label style={labelStyle}>Title *</label>
              <input name="title" value={form.title} onChange={handleChange} required style={inputStyle} placeholder="e.g. Prime Residential Plot in Model Town" />
            </div>
            <div>
              <label style={labelStyle}>Location *</label>
              <input name="location" value={form.location} onChange={handleChange} required style={inputStyle} placeholder="e.g. Model Town, Ludhiana" />
            </div>
            <div>
              <label style={labelStyle}>Price (₹) *</label>
              <input name="price" type="number" value={form.price} onChange={handleChange} required style={inputStyle} placeholder="e.g. 2500000" />
            </div>
            <div>
              <label style={labelStyle}>Size *</label>
              <input name="size" value={form.size} onChange={handleChange} required style={inputStyle} placeholder="e.g. 5 Marla / 1200 sq ft" />
            </div>
            <div>
              <label style={labelStyle}>Type</label>
              <select name="type" value={form.type} onChange={handleChange} style={inputStyle}>
                {["Residential", "Commercial", "Agricultural", "Industrial"].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Status</label>
              <select name="status" value={form.status} onChange={handleChange} style={inputStyle}>
                {["Available", "Reserved", "Sold"].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div style={{ gridColumn: "1/-1" }}>
              <label style={labelStyle}>Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} rows={4}
                style={{ ...inputStyle, resize: "vertical" }} placeholder="Describe the plot, surroundings, special features..." />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <input type="checkbox" id="featured" name="featured" checked={form.featured} onChange={handleChange} style={{ width: "18px", height: "18px", cursor: "pointer" }} />
              <label htmlFor="featured" style={{ ...labelStyle, marginBottom: 0, cursor: "pointer" }}>Feature on Homepage</label>
            </div>
          </div>
        </div>

        {/* Images */}
        <div style={{ background: "#fff", borderRadius: "4px", padding: "2rem", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", marginBottom: "1.5rem" }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.3rem", marginBottom: "1.5rem", color: "#7a7568" }}>Images</h2>

          {/* Existing images */}
          {existingImages.length > 0 && (
            <div style={{ marginBottom: "1.5rem" }}>
              <p style={labelStyle}>Current Images</p>
              <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap" }}>
                {existingImages.map((img, i) => (
                  <div key={i} style={{ position: "relative" }}>
                    <img src={img} alt="" style={{ width: "100px", height: "75px", objectFit: "cover", borderRadius: "2px" }} />
                    <button type="button" onClick={() => removeExistingImage(img)}
                      style={{ position: "absolute", top: "-6px", right: "-6px", background: "#c0392b", color: "#fff", border: "none", borderRadius: "50%", width: "20px", height: "20px", cursor: "pointer", fontSize: "0.7rem", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* New images */}
          <label style={labelStyle}>Upload New Images</label>
          <input type="file" multiple accept="image/*" onChange={handleFiles}
            style={{ padding: "8px 0", fontSize: "0.9rem" }} />
          {previews.length > 0 && (
            <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap", marginTop: "1rem" }}>
              {previews.map((p, i) => (
                <img key={i} src={p} alt="" style={{ width: "100px", height: "75px", objectFit: "cover", borderRadius: "2px", border: "2px dashed #c9a84c" }} />
              ))}
            </div>
          )}
          <p style={{ color: "#7a7568", fontSize: "0.8rem", marginTop: "0.5rem" }}>Upload up to 10 images. JPG, PNG, or WebP.</p>
        </div>

        <div style={{ display: "flex", gap: "1rem" }}>
          <button type="submit" disabled={saving} style={{
            background: "#c9a84c", border: "none", color: "#0f0e0c",
            padding: "14px 36px", fontWeight: 700, fontSize: "0.9rem", borderRadius: "2px",
            cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1, letterSpacing: "0.05em",
          }}>
            {saving ? "Saving..." : isEdit ? "Update Plot" : "Add Plot"}
          </button>
          <button type="button" onClick={() => navigate("/admin/plots")} style={{
            background: "transparent", border: "1px solid #ddd", color: "#7a7568",
            padding: "14px 28px", borderRadius: "2px", cursor: "pointer", fontSize: "0.9rem",
          }}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
