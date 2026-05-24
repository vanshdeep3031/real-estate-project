#!/bin/bash
echo "Starting LandMark Real Estate..."
echo ""
echo "Starting backend on port 8000..."
cd server && npm run dev &
echo ""
echo "Starting frontend on port 3000..."
cd ../client && npm start
