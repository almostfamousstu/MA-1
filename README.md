# **Decision-Key-Flat-File-MiAu**

## 📄 Overview

**UK Toy Market Custom Unify Report Automation**
The objective of this solution is to reliably automate this process.


**POC DISCLAIMER**
This repository serves as the **proof of concept (POC)** for the MARU Developer Portal.
The goal of this POC is to demonstrate a streamlined onboarding and execution workflow for third-party developers within a standardized GitHub environment.

This repository allows developers to:

* Quickly spin up a ready-to-use **Codespace** environment with all dependencies preinstalled.
* Review structured documentation outlining **requirements**, **constraints**, and **solution design**.
* Implement, test, and deliver a working automation with minimal setup friction.

---

## 🧭 Solution Objective

The task is to **develop and validate a Python script** that:

1. Calls the UNIFY+ reporting service via provided API.
2. Retrieves the required dataset.
3. Generates a properly formatted flat file.
4. Delivers the file to the designated internal location (secure mFTP endpoint).


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

1. Developer launches a Codespace → container builds automatically using the provided `Dockerfile` and `devcontainer.json`.
2. The Python environment installs all dependencies from `requirements.txt`.
3. Developer configures `config.yaml` with valid credentials and parameters.
4. The `dkFlatFileExtract.py` script is executed via `python3 dkFlatFileExtract.py <ARGS>`.
5. Output file is validated and delivered to the target location.

---

## 🧰 Reference Documentation

* [Internal Reporting Service API Docs](./docs/reporting_service_api.md)
* [Developer Portal Guidelines](./docs/developer_portal_standards.md)
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

Once validated, the automation will be scheduled or integrated into internal orchestration tools (e.g., Airflow, Control-M, or internal schedulers).
For the POC, execution will be manual via the CLI.

---

## 🔒 Security & Access

* **Authentication:** Service credentials are stored as GitHub Secrets or in a local `.env` file (excluded via `.gitignore`).
* **Data Handling:** Generated flat files contain internal data; and cannot be uploaded to public repositories.
* **Access Control:** Only approved developers will have access to this repo (via MARU Developer Portal).

---
