# NSER-IBVS - Presentation Website

[![Conference](https://img.shields.io/badge/Paper-ICCV%202025-blue)](https://openaccess.thecvf.com/content/ICCV2025W/EVW/papers/Mocanu_Efficient_Self-Supervised_Neuro-Analytic_Visual_Servoing_for_Real-time_Quadrotor_Control_ICCVW_2025_paper.pdf)
[![Code Implementation](https://img.shields.io/badge/Code-Implementation-green)](https://github.com/SpaceTime-Vision-Robotics-Laboratory/nser-ibvs-drone)
[![arXiv](https://img.shields.io/badge/arXiv-2507.19878-b31b1b.svg)](https://arxiv.org/abs/2507.19878)
[![Hugging Face Collection](https://img.shields.io/badge/🤗-Collection-yellow)](https://huggingface.co/collections/brittleru/nser-ibvs-suite)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

This repository contains the source code and assets for the official project website of the paper
**"Efficient Self-Supervised Neuro-Analytic Visual Servoing for Real-time Quadrotor Control"**, 
presented at the **ICCV 2025 Embedded Vision Workshop (Oral)**.

**Live Website:** [spacetime-vision-robotics-laboratory.github.io/NSER-IBVS](https://spacetime-vision-robotics-laboratory.github.io/NSER-IBVS/)

## Paper Summary

**Authors:** Sebastian Mocanu, Sebastian-Ion Nae, Mihai Eugen Barbu, Marius Leordeanu

**Abstract:**

> We present a self-supervised neuro-analytical framework featuring a Numerically Stable 
> Efficient and Reduced (NSER) Image-Based Visual Servoing (IBVS) teacher model. 
> This teacher is distilled into a lightweight 1.7M parameter student network that 
> achieves 11x real-time performance with improved control accuracy, enabling autonomous
> drone navigation in GPS-denied environments.

## Resources
- [Paper (PDF)](assets/EVW-10-Efficient_Self_Supervised_Neuro_Analytic_Visual_Servoing_for_Real_time_Quadrotor_Control-10.pdf)
- [arXiv](https://arxiv.org/abs/2507.19878)
- [Code](https://github.com/SpaceTime-Vision-Robotics-Laboratory/nser-ibvs-drone)
- [Hugging Face Collection](https://huggingface.co/collections/brittleru/nser-ibvs-suite) - Models, Demos, Dataset
- [Poster](assets/NSER-IBVS-Poster-ICCV-2025.pdf)
- [Dataset](https://drive.google.com/drive/folders/1T2Uq8nPQoy_QNiI87xBUoXlPAk7k-9Cq?usp=sharing)

## Local Development

Simply open `index.html` in a browser, or serve with any static file server:

```bash
python -m http.server 8000
```

## Deployment

The site auto-deploys to GitHub Pages via the included workflow 
[.github/workflows/github-pages.yml](.github/workflows/github-pages.yml), 
which handles image compression and CSS/JS minification.


## Citation
```bibtex
@InProceedings{Mocanu_2025_ICCV,
    author    = {Mocanu, Sebastian and Nae, Sebastian-Ion and Barbu, Mihai-Eugen and Leordeanu, Marius},
    title     = {Efficient Self-Supervised Neuro-Analytic Visual Servoing for Real-time Quadrotor Control},
    booktitle = {Proceedings of the IEEE/CVF International Conference on Computer Vision (ICCV) Workshops},
    month     = {October},
    year      = {2025},
    pages     = {1744-1753}
}
```