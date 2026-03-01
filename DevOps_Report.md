# Scientific Calculator with DevOps | Mini Project Report

**Author**: [Your Name]  
**Roll Number**: MT2020xx  
**Date**: March 2, 2026

---

## 1. What and Why of DevOps?
### What is DevOps?
DevOps is a set of practices, tools, and a cultural philosophy that automate and integrate the processes between software development and IT teams. It emphasizes team empowerment, cross-team communication and collaboration, and technology automation.

### Why DevOps?
- **Speed**: Move at the velocity you need to innovate for customers faster.
- **Rapid Delivery**: Increase the frequency and pace of releases.
- **Reliability**: Ensure the quality of application updates and infrastructure changes.
- **Scale**: Operate and manage your infrastructure and development processes at scale.
- **Improved Collaboration**: Build more effective teams under a DevOps cultural model.

## 2. Tools Used (Baseline)
1. **Source Control Management**: GitHub / GitLab / BitBucket
2. **Testing**: JUnit (Backend) / Jest (Frontend)
3. **Build**: Maven (Backend) / Vite (Frontend)

## 3. Scientific Calculator Features
The application performs 4 core scientific operations:
1. **Square Root (√)**: Backend uses `Math.sqrt(x)`.
2. **Factorial (!)**: Custom iterative implementation for `x!`.
3. **Natural Log (ln)**: Backend uses `Math.log(x)`.
4. **Power (x^b)**: Backend uses `Math.pow(x, b)`.

## 4. Current State & Setup
### Backend (Spring Boot)
- **Setup**: A Maven-based Spring Boot project with a REST controller.
- **Endpoint Example**: `GET /api/calculator/sqrt?x=16` returns `4.0`.
- **JUnit Tests**: Validates all math operations against known outputs.

### Frontend (React)
- **Setup**: A Vite-based React application with `axios` for API consumption and `framer-motion` for a premium, glassmorphic UI.
- **UI Design**: Uses a dark mode aesthetic with consistent spacing and accessible buttons.

---
*(Note: Docker, CI/CD, Deployment, and Monitoring steps will be added to this report in the next phase.)*
