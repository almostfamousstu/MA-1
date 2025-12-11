# **Gen Merch CREST Flash Report**

## 📄 Overview

**CREST Flash Report**
Automate the manual process to pull and transform data to produce the Monthly CREST Flash Report.

---

## 🧭 Solution Objective

The task is to **develop and validate a Python script** that:

1. Update Decision Key data in six Excel reports
2. Review Excel reports for data/format accuracy
3. Copy/Paste data from the six reports into one Excel template
4. Copy/Paste template into email and internal system to distribute monthly


---

## 🧩 Architecture & Solution Design

### Components

| Component                                     | Description                                                                             |
| --------------------------------------------- | --------------------------------------------------------------------------------------- |
| **Decision Key "Utility Belt" SDK**           | Provides prebuilt functions for data extraction.                                        |
| **Automation Script (`dkFlatFileExtract.py`)**| Implements extraction logic, flat file generation, and delivery.                        |
| **Config (`config.yaml`)**                    | Stores environment variables such as service endpoint, credentials, and delivery paths. |
| **Dev Container (`.devcontainer/` folder)**   | Defines a portable development environment for GitHub Codespaces.                       |
| **Tests (`/tests`)**                          | Unit tests for validating the automation workflow.                                      |

### Flow

1. Extract: Leverage the *DK utility belt* to pull data directly from Databricks instead of manually updating six separate Excel reports.
2. Transform: Apply data validation and formatting rules automatically to ensure accuracy and consistency across all reports.
3. Load & Consolidate: Merge data from multiple sources into a single standardized Excel template without manual copy/paste steps.

---

## 🧰 Reference Documentation

* [ Cloud Analytics - Enablement Layer](https://iriworldwide-my.sharepoint.com/:p:/g/personal/olufemi_akinbode_circana_com/IQCnQBptMAfPH_W6lERel-GGAYQGeoX2M0kUnoSlcT-ysFs?e=hF4e90)
* [GenMerch Resource Center](https://iriworldwide.sharepoint.com/sites/product)
* [Coding Standards & Review Process](./docs/code_review_standards.md)

---

## ⚙️ Development Environment

### GitHub Codespaces

Click **“Code → Open with Codespaces”** to launch the preconfigured environment.


---

## 🧪 Testing

Run all tests before submitting for review:

```bash
pytest tests/
```

Test coverage includes:

* DK connection validation
* Flat file schema conformity
* Delivery endpoint availability

---

## 🚀 Deployment / Delivery

Once validated, the notebook will be added to a pipeline in Databricks and will be triggerd monthly. 

* [Decision Key Databricks Pipeline](https://adb-7295981015989544.4.azuredatabricks.net/jobs?o=7295981015989544)

---

## 🔒 Security & Access


---
