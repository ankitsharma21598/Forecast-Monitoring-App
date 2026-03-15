# Data Analysis: Wind Forecast

This directory contains research and analysis notebooks for the wind forecast monitoring system.

## Overview

The goal of this analysis is to evaluate forecast accuracy and visualize wind speed/power trends using historical data and API results.

## Environment Setup

### Prerequisites

- Python 3.10+
- Virtualenv (optional but recommended)

### Installation

It is recommended to use the provided virtual environment or create a new one:

```bash
cd "Data Analysis"
# Create a virtual environment
python -m venv myenv
# Activate it (on macOS/Linux)
source myenv/bin/activate
# Install dependencies
pip install -r requirements.txt
```

## Contents

- `wind_forecast_analysis.ipynb`: The main Jupyter Notebook containing data ingestion, cleaning, and visualization logic.
- `requirements.txt`: List of Python libraries required for the analysis.

## Key Libraries

- **Pandas**: Data manipulation and analysis.
- **Matplotlib & Seaborn**: Static data visualization.
- **Requests**: Fetching data from the backend or external APIs.

## Usage

1. Activate your virtual environment.
2. Launch Jupyter Lab or Notebook:
   ```bash
   jupyter notebook
   ```
3. Open `wind_forecast_analysis.ipynb` and run the cells.
