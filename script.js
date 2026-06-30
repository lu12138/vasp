const steps = [
  {
    title: "计算任务准备",
    bullets: [
      "先确定要计算的性质，再准备对应模型、参考体系和后处理文件。",
      "同一类能量差计算必须尽量保持计算精度、超胞大小和参数一致。",
      "涉及公式的任务需要明确每一项总能和化学势来源。"
    ],
    command: "mkdir 01_relax 02_static 03_band 04_dos\ncp POSCAR POTCAR KPOINTS INCAR 01_relax/"
  },
  {
    title: "参数收敛",
    bullets: [
      "先测试 ENCUT，再测试 KPOINTS，避免两个变量同时变化。",
      "目标通常是总能差、力或目标性质在可接受阈值内稳定。",
      "记录每组参数、能量、耗时和最终选择。"
    ],
    command: "ENCUT: 400 450 500 550 600\nKPOINTS: 3x3x3 5x5x5 7x7x7\ncriterion: ΔE < 1 meV/atom"
  },
  {
    title: "结构优化",
    bullets: [
      "使用收敛后的 ENCUT 与 KPOINTS 优化晶格和原子位置。",
      "关注 EDIFFG、IBRION、ISIF、NSW 与实际体系是否匹配。",
      "结束后检查 CONTCAR、OSZICAR、OUTCAR 中的力和收敛状态。"
    ],
    command: "grep 'reached required accuracy' OUTCAR\ngrep 'F=' OSZICAR | tail\ncp CONTCAR ../02_static/POSCAR"
  },
  {
    title: "静态计算",
    bullets: [
      "基于优化后的结构执行高精度单点计算。",
      "常用于生成后续 DOS、Bader、电荷密度或介电性质所需文件。",
      "按需求开启 LCHARG、LWAVE、LAECHG、NEDOS 等输出。"
    ],
    command: "cp 01_relax/CONTCAR 02_static/POSCAR\ncp 02_static/CHGCAR 03_band/"
  },
  {
    title: "能带与 DOS",
    bullets: [
      "能带计算通常读取静态计算得到的 CHGCAR。",
      "KPOINTS 改为高对称路径，ICHARG 常设为 11。",
      "DOS 计算使用较密 K 点网格，并检查费米能级与投影设置。"
    ],
    command: "ICHARG = 11\nLORBIT = 11\nNEDOS  = 2000"
  },
  {
    title: "结果归档",
    bullets: [
      "保留关键输入、输出、绘图脚本和最终图表。",
      "记录 VASP 版本、赝势版本、计算节点和参数选择依据。",
      "用 README 汇总体系、目的、参数、结果和未解决问题。"
    ],
    command: "tar -czf project_vasp_results.tar.gz INCAR KPOINTS POSCAR POTCAR OUTCAR OSZICAR vasprun.xml"
  }
];

const figureReferenceLibrary = {
  siteSpecificElectrodeposition: {
    title: "Site-specific electrodeposition enables self-terminating growth of atomically dispersed metal catalysts",
    journal: "Nature Communications",
    visual: "slab",
    figure: "Fig. 2",
    image: "https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41467-020-18430-8/MediaObjects/41467_2020_18430_Fig2_HTML.png",
    note: "图中包含 DFT 优化后的 Pt-SAs/MoS2 结构模型，适合参考 slab 表面结构和活性位点展示。",
    doi: "10.1038/s41467-020-18430-8",
    url: "https://doi.org/10.1038/s41467-020-18430-8"
  },
  feNCOr: {
    title: "Insights into the activity of single-atom Fe-N-C catalysts for oxygen reduction reaction",
    journal: "Nature Communications",
    visual: "energy",
    image: "https://media.springernature.com/m685/springer-static/image/art%3A10.1038%2Fs41467-022-29797-1/MediaObjects/41467_2022_29797_Fig1_HTML.png",
    note: "可参考单原子催化活性位点、吸附中间体和反应能量图的展示方式。",
    doi: "10.1038/s41467-022-29797-1",
    url: "https://doi.org/10.1038/s41467-022-29797-1"
  },
  supportedClusters: {
    title: "Deducing subnanometer cluster size and shape distributions of heterogeneous supported catalysts",
    journal: "Nature Communications",
    visual: "structure",
    figure: "Fig. 2",
    image: "https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41467-023-37664-w/MediaObjects/41467_2023_37664_Fig2_HTML.png",
    note: "图中展示最稳定吸附结构和 Gibbs free energy 分布，适合结构优化/总能筛选参考。",
    doi: "10.1038/s41467-023-37664-w",
    url: "https://doi.org/10.1038/s41467-023-37664-w"
  },
  adsorptionIntrinsic: {
    title: "Determining the adsorption energies of small molecules with the intrinsic properties of adsorbates and substrates",
    journal: "Nature Communications",
    visual: "energy",
    figure: "Fig. 1",
    image: "https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41467-020-14969-8/MediaObjects/41467_2020_14969_Fig1_HTML.png",
    note: "图中直接比较不同吸附物在金属表面的 adsorption energy，和吸附能任务最对应。",
    doi: "10.1038/s41467-020-14969-8",
    url: "https://doi.org/10.1038/s41467-020-14969-8"
  },
  adsorptionBalanced: {
    title: "Adsorption energies on transition metal surfaces: towards an accurate and balanced description",
    journal: "Nature Communications",
    visual: "surface",
    figure: "Fig. 6",
    image: "https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41467-022-34507-y/MediaObjects/41467_2022_34507_Fig6_HTML.png",
    note: "适合参考过渡金属表面吸附能标定、不同泛函结果比较和误差展示。",
    doi: "10.1038/s41467-022-34507-y",
    url: "https://doi.org/10.1038/s41467-022-34507-y"
  },
  cuSurfaceEnergy: {
    title: "In situ copper faceting enables efficient CO2/CO electrolysis",
    journal: "Nature Communications",
    visual: "surface",
    figure: "Fig. 1",
    image: "https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41467-024-45538-y/MediaObjects/41467_2024_45538_Fig1_HTML.png",
    note: "图中直接给出 Cu(111)/Cu(100) 在不同覆盖度下的 surface energies 和 Wulff construction，和表面能任务对应。",
    doi: "10.1038/s41467-024-45538-y",
    url: "https://doi.org/10.1038/s41467-024-45538-y"
  },
  dosAdsorption: {
    title: "Machine learned features from density of states for accurate adsorption energy prediction",
    journal: "Nature Communications",
    visual: "dos",
    figure: "Fig. 7",
    image: "https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41467-020-20342-6/MediaObjects/41467_2020_20342_Fig7_HTML.png",
    note: "图中直接给出 surface site 的 DOS、吸附敏感性和 COHP，适合 DOS/PDOS 图例参考。",
    doi: "10.1038/s41467-020-20342-6",
    url: "https://doi.org/10.1038/s41467-020-20342-6"
  },
  ureaMBenes: {
    title: "Electrochemical synthesis of urea on MBenes",
    journal: "Nature Communications",
    visual: "reaction",
    figure: "Fig. 3",
    image: "https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41467-021-24400-5/MediaObjects/41467_2021_24400_Fig3_HTML.png",
    note: "图中是电化学反应 free energy profiles，适合吸附中间体和反应能量图参考。",
    doi: "10.1038/s41467-021-24400-5",
    url: "https://doi.org/10.1038/s41467-021-24400-5"
  },
  ammoniaDenitrification: {
    title: "Steering from electrochemical denitrification to ammonia synthesis",
    journal: "Nature Communications",
    visual: "reaction",
    figure: "Fig. 2",
    image: "https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41467-023-35785-w/MediaObjects/41467_2023_35785_Fig2_HTML.png",
    note: "图中包含反应网络、全局能量优化和最优路径，适合反应路径/能垒图参考。",
    doi: "10.1038/s41467-023-35785-w",
    url: "https://doi.org/10.1038/s41467-023-35785-w"
  },
  substitutionalOxygen: {
    title: "Identifying substitutional oxygen as a prolific point defect in monolayer transition metal dichalcogenides",
    journal: "Nature Communications",
    visual: "defect",
    figure: "Fig. 3",
    image: "https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41467-019-11342-2/MediaObjects/41467_2019_11342_Fig3_HTML.png",
    note: "图中是 DFT relaxed coordinates 的空位、H 替位和 O 替位模型，和替位缺陷最对应。",
    doi: "10.1038/s41467-019-11342-2",
    url: "https://doi.org/10.1038/s41467-019-11342-2"
  },
  spinDefectQubits: {
    title: "Spin-defect qubits in two-dimensional transition metal dichalcogenides operating at telecom wavelengths",
    journal: "Nature Communications",
    visual: "defect",
    figure: "Fig. 2",
    image: "https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41467-022-35048-0/MediaObjects/41467_2022_35048_Fig2_HTML.png",
    note: "图中直接展示 defect formation energies，适合空位/点缺陷形成能图例参考。",
    doi: "10.1038/s41467-022-35048-0",
    url: "https://doi.org/10.1038/s41467-022-35048-0"
  },
  perovskiteDefect: {
    title: "Inhibition of defect-induced alpha-to-delta phase transition for efficient and stable formamidinium perovskite solar cells",
    journal: "Nature Communications",
    visual: "defect",
    figure: "Fig. 1",
    image: "https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41467-023-41853-y/MediaObjects/41467_2023_41853_Fig1_HTML.png",
    note: "图中包含 point defects 对相变 energy barrier 的影响，适合缺陷诱导能量变化参考。",
    doi: "10.1038/s41467-023-41853-y",
    url: "https://doi.org/10.1038/s41467-023-41853-y"
  },
  calciumCarbides: {
    title: "Investigation of exotic stable calcium carbides using theory and experiment",
    journal: "Nature Communications",
    visual: "structure",
    figure: "Fig. 8",
    image: "https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fncomms7974/MediaObjects/41467_2015_Article_BFncomms7974_Fig8_HTML.jpg",
    note: "图中是实验参数和 DFT predictions 对比，适合总能/结构稳定性结果参考。",
    doi: "10.1038/ncomms7974",
    url: "https://doi.org/10.1038/ncomms7974"
  },
  strainedGeInterstitial: {
    title: "Direct bandgap emission from strain-doped germanium",
    journal: "Nature Communications",
    visual: "defect",
    figure: "Fig. 1",
    image: "https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41467-024-44916-w/MediaObjects/41467_2024_44916_Fig1_HTML.png",
    note: "图中展示 Li 原子占据 Ge 四面体间隙位点的计算模型和对应能带，适合间隙原子模型参考。",
    doi: "10.1038/s41467-024-44916-w",
    url: "https://doi.org/10.1038/s41467-024-44916-w"
  },
  gwBand2D: {
    title: "Representing individual electronic states for machine learning GW band structures of 2D materials",
    journal: "Nature Communications",
    visual: "band",
    figure: "Fig. 5",
    image: "https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41467-022-28122-0/MediaObjects/41467_2022_28122_Fig5_HTML.png",
    note: "图中直接给出多种 2D 材料的 PBE/GW band structures，和能带结构任务最对应。",
    doi: "10.1038/s41467-022-28122-0",
    url: "https://doi.org/10.1038/s41467-022-28122-0"
  },
  absoluteEnergyLevels: {
    title: "Absolute energy level positions in tin- and lead-based halide perovskites",
    journal: "Nature Communications",
    visual: "band",
    figure: "Fig. 2",
    image: "https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41467-019-10468-7/MediaObjects/41467_2019_10468_Fig2_HTML.png",
    note: "图中比较 measured 与 DFT-calculated DOS，适合 DOS/PDOS 和能级对齐参考。",
    doi: "10.1038/s41467-019-10468-7",
    url: "https://doi.org/10.1038/s41467-019-10468-7"
  },
  molecularConductors: {
    title: "A single atom change turns insulating saturated wires into molecular conductors",
    journal: "Nature Communications",
    visual: "band",
    image: "https://media.springernature.com/m685/springer-static/image/art%3A10.1038%2Fs41467-021-23528-8/MediaObjects/41467_2021_23528_Fig1_HTML.png",
    note: "可参考原子替换导致能带/导电性变化的结构-电子性质对应图。",
    doi: "10.1038/s41467-021-23528-8",
    url: "https://doi.org/10.1038/s41467-021-23528-8"
  },
  pseudodoping2D: {
    title: "Pseudodoping of a metallic two-dimensional material by the supporting substrate",
    journal: "Nature Communications",
    visual: "charge",
    figure: "Fig. 4",
    image: "https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41467-018-08088-8/MediaObjects/41467_2018_8088_Fig4_HTML.png",
    note: "图中比较基底作用前后的 Ta-d DOS，适合界面电荷转移和 DOS 参考。",
    doi: "10.1038/s41467-018-08088-8",
    url: "https://doi.org/10.1038/s41467-018-08088-8"
  },
  carbonNitrideFe2: {
    title: "Carbon nitride supported Fe2 cluster catalysts with superior performance for alkene epoxidation",
    journal: "Nature Communications",
    visual: "charge",
    figure: "Fig. 3",
    image: "https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41467-018-04845-x/MediaObjects/41467_2018_4845_Fig3_HTML.jpg",
    note: "图中包含理论 energy profile，适合催化反应路径和能垒展示参考。",
    doi: "10.1038/s41467-018-04845-x",
    url: "https://doi.org/10.1038/s41467-018-04845-x"
  },
  fePcBader: {
    title: "Iron phthalocyanine with coordination induced electronic localization to boost oxygen reduction reaction",
    journal: "Nature Communications",
    visual: "charge",
    figure: "Fig. 1",
    image: "https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41467-020-18062-y/MediaObjects/41467_2020_18062_Fig1_HTML.png",
    note: "图中明确包含 Bader charge transfers、电子局域函数和吸附能，和 Bader 电荷分析最对应。",
    doi: "10.1038/s41467-020-18062-y",
    url: "https://doi.org/10.1038/s41467-020-18062-y"
  },
  mineralElectronTransfer: {
    title: "Electron transfer rules of minerals under pressure informed by machine learning",
    journal: "Nature Communications",
    visual: "charge",
    image: "https://media.springernature.com/m685/springer-static/image/art%3A10.1038%2Fs41467-023-37384-1/MediaObjects/41467_2023_37384_Fig1_HTML.png",
    note: "可参考电子转移趋势、价态变化和定量电荷分析的数据表达。",
    doi: "10.1038/s41467-023-37384-1",
    url: "https://doi.org/10.1038/s41467-023-37384-1"
  },
  heuslerOhmicInterface: {
    title: "Thermal-inert and ohmic-contact interface for high performance half-Heusler based thermoelectric generator",
    journal: "Nature Communications",
    visual: "charge",
    figure: "Fig. 4",
    image: "https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41467-022-35290-6/MediaObjects/41467_2022_35290_Fig4_HTML.png",
    note: "图中明确包含 interface charge density difference，和电荷差分任务最对应。",
    doi: "10.1038/s41467-022-35290-6",
    url: "https://doi.org/10.1038/s41467-022-35290-6"
  },
  reactiveForceFields: {
    title: "Active learning of reactive Bayesian force fields applied to heterogeneous catalysis dynamics of H/Pt",
    journal: "Nature Communications",
    visual: "neb",
    figure: "Fig. 2",
    image: "https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41467-022-32294-0/MediaObjects/41467_2022_32294_Fig2_HTML.png",
    note: "可参考表面反应动力学、迁移路径和能量变化数据图。",
    doi: "10.1038/s41467-022-32294-0",
    url: "https://doi.org/10.1038/s41467-022-32294-0"
  },
  co2ReductionNeb: {
    title: "Reaction mechanism and kinetics for CO2 reduction on nickel single atom catalysts from quantum mechanics",
    journal: "Nature Communications",
    visual: "neb",
    figure: "Fig. 3",
    image: "https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41467-020-16119-6/MediaObjects/41467_2020_16119_Fig3_HTML.png",
    note: "图注明确写到 CI-NEB minimum energy path 和 00-05 images，和 NEB 迁移能垒任务最对应。",
    doi: "10.1038/s41467-020-16119-6",
    url: "https://doi.org/10.1038/s41467-020-16119-6"
  }
};

const structureOptions = [
  {
    title: "结构优化 / 总能",
    purpose: "得到稳定结构、晶格常数、最终总能，作为后续所有计算的基础。",
    detail: [
      "结构优化的核心目标是通过调整原子位置或晶格参数，使体系总能量达到最小值。在 VASP 中，这一过程通常通过迭代算法实现，例如共轭梯度法（Conjugate Gradient）或准牛顿法（Quasi-Newton）。优化过程中，系统会根据当前的原子力和能量变化进行调整，直到满足预设的收敛条件。",
      "结构优化的理论基础是密度泛函理论（DFT），其核心是通过交换-相关泛函描述电子结构。VASP 中常用的交换-相关泛函包括 PW91 和 PBE 等，这些泛函通过近似描述电子之间的相互作用，从而计算体系的总能量和结构。"
    ],
    figureRefs: [
      figureReferenceLibrary.supportedClusters
    ],
    needs: ["初始 POSCAR 或 CIF", "结构优化 INCAR", "收敛后的 KPOINTS", "元素顺序一致的 POTCAR"],
    models: ["原胞或常规胞模型", "必要时建立超胞模型", "ENCUT 收敛测试模型", "KPOINTS 收敛测试模型"],
    formula: "E_{bulk}^{atom} = \\frac{E_{bulk}}{N_{atoms}}",
    output: ["CONTCAR", "OSZICAR", "OUTCAR", "vasprun.xml"],
    code: "mkdir 01_relax 02_static\ncp POSCAR INCAR KPOINTS POTCAR 01_relax/\ncp 01_relax/CONTCAR 02_static/POSCAR"
  },
  {
    title: "表面能",
    purpose: "计算某个晶面的表面稳定性，常用于比较不同晶面或 slab 设置。",
    figureRefs: [
      figureReferenceLibrary.cuSurfaceEnergy
    ],
    needs: ["优化后的体相结构", "干净 slab 结构", "足够真空层", "固定层设置", "slab 面积 A"],
    models: ["体相静态模型", "干净 slab 静态模型", "不同 slab 层数模型", "不同真空层厚度模型"],
    formula: "\\gamma = \\frac{E_{slab} - N E_{bulk}^{atom}}{2A}",
    output: ["体相 OUTCAR/OSZICAR 总能", "slab OUTCAR/OSZICAR 总能", "slab 表面积 A"],
    code: "mkdir 01_bulk_static 02_slab_relax 03_slab_static\ncp bulk_CONTCAR 01_bulk_static/POSCAR\ncp slab_POSCAR 02_slab_relax/POSCAR\ncp 02_slab_relax/CONTCAR 03_slab_static/POSCAR"
  },
  {
    title: "吸附能",
    purpose: "计算原子或分子吸附到表面后的稳定性，并比较不同吸附位点。",
    figureRefs: [
      figureReferenceLibrary.adsorptionIntrinsic
    ],
    needs: ["干净 slab", "单独吸附物", "slab+吸附物结构", "相同精度的 INCAR/KPOINTS/POTCAR"],
    models: ["干净 slab 静态模型", "孤立吸附物静态模型", "top 位吸附模型", "bridge 位吸附模型", "hollow 位吸附模型"],
    formula: "E_{ads} = E_{slab+adsorbate} - E_{slab} - E_{adsorbate}",
    output: ["各构型 OUTCAR/OSZICAR 总能", "最低 E_ads 对应最稳定吸附构型"],
    code: "mkdir 01_clean_slab 02_adsorbate 03_ads_top 04_ads_bridge 05_ads_hollow\ncp clean_slab_POSCAR 01_clean_slab/POSCAR\ncp adsorbate_POSCAR 02_adsorbate/POSCAR\ncp ads_top_POSCAR 03_ads_top/POSCAR\ncp ads_bridge_POSCAR 04_ads_bridge/POSCAR\ncp ads_hollow_POSCAR 05_ads_hollow/POSCAR"
  },
  {
    title: "空位形成能",
    purpose: "计算去掉一个原子后形成空位缺陷的能量代价。",
    figureRefs: [
      figureReferenceLibrary.spinDefectQubits
    ],
    needs: ["完美超胞", "空位超胞", "被移除元素的化学势", "相同超胞尺寸和计算精度"],
    models: ["完美超胞静态模型", "空位缺陷弛豫模型", "空位缺陷静态模型", "元素参考相化学势模型"],
    formula: "E_{vac} = E_{vacancy} - E_{perfect} + \\mu_{removed}",
    output: ["完美超胞总能", "空位超胞总能", "被移除元素化学势 mu_removed"],
    code: "mkdir 01_perfect 02_vacancy 03_reference_mu\ncp perfect_supercell_POSCAR 01_perfect/POSCAR\ncp vacancy_POSCAR 02_vacancy/POSCAR\ncp reference_POSCAR 03_reference_mu/POSCAR"
  },
  {
    title: "替位形成能",
    purpose: "计算 A 原子替换 B 原子后的掺杂或替位缺陷形成能。",
    figureRefs: [
      figureReferenceLibrary.substitutionalOxygen
    ],
    needs: ["完美超胞", "替位超胞", "加入元素化学势", "被替换元素化学势"],
    models: ["完美超胞静态模型", "替位缺陷弛豫模型", "替位缺陷静态模型", "掺杂元素参考相", "被替换元素参考相"],
    formula: "E_{sub} = E_{substitution} - E_{perfect} - \\mu_{added} + \\mu_{removed}",
    output: ["完美超胞总能", "替位超胞总能", "mu_added", "mu_removed"],
    code: "mkdir 01_perfect 02_substitution 03_mu_added 04_mu_removed\ncp perfect_supercell_POSCAR 01_perfect/POSCAR\ncp substitution_POSCAR 02_substitution/POSCAR\ncp added_reference_POSCAR 03_mu_added/POSCAR\ncp removed_reference_POSCAR 04_mu_removed/POSCAR"
  },
  {
    title: "间隙形成能",
    purpose: "计算额外原子进入晶体间隙位置后的形成能。",
    figureRefs: [
      figureReferenceLibrary.strainedGeInterstitial
    ],
    needs: ["完美超胞", "间隙原子超胞", "加入元素化学势", "多个候选间隙位点"],
    models: ["完美超胞静态模型", "tetrahedral 间隙模型", "octahedral 间隙模型", "加入元素参考相"],
    formula: "E_{int} = E_{interstitial} - E_{perfect} - \\mu_{added}",
    output: ["完美超胞总能", "间隙缺陷总能", "加入元素化学势 mu_added"],
    code: "mkdir 01_perfect 02_interstitial_tet 03_interstitial_oct 04_mu_added\ncp perfect_supercell_POSCAR 01_perfect/POSCAR\ncp interstitial_tet_POSCAR 02_interstitial_tet/POSCAR\ncp interstitial_oct_POSCAR 03_interstitial_oct/POSCAR\ncp added_reference_POSCAR 04_mu_added/POSCAR"
  },
  {
    title: "能带结构",
    purpose: "在静态自洽电荷密度基础上做非自洽能带计算，判断带隙和能带色散。",
    figureRefs: [
      figureReferenceLibrary.gwBand2D
    ],
    needs: ["优化后的 POSCAR", "静态计算 CHGCAR", "高对称路径 KPOINTS", "ICHARG = 11 的 INCAR"],
    models: ["结构优化模型", "静态自洽模型", "高对称路径能带模型"],
    formula: "",
    output: ["EIGENVAL", "PROCAR", "vasprun.xml", "OUTCAR 中的 E-fermi"],
    code: "mkdir 01_relax 02_static 03_band\ncp 01_relax/CONTCAR 02_static/POSCAR\ncp 02_static/POSCAR 03_band/POSCAR\ncp 02_static/CHGCAR 03_band/CHGCAR\ncp KPOINTS_band 03_band/KPOINTS"
  },
  {
    title: "态密度 / 分波态密度",
    purpose: "分析总 DOS、元素投影 DOS、轨道投影 DOS，判断费米能级附近电子态来源。",
    figureRefs: [
      figureReferenceLibrary.absoluteEnergyLevels
    ],
    needs: ["优化后的 POSCAR", "静态或 DOS 专用 KPOINTS", "LORBIT = 11", "NEDOS 合理取值"],
    models: ["结构优化模型", "高精度静态模型", "密 K 点 DOS 模型"],
    formula: "",
    output: ["DOSCAR", "vasprun.xml", "PROCAR", "OUTCAR 中的 E-fermi"],
    code: "mkdir 01_relax 02_static 03_dos\ncp 01_relax/CONTCAR 02_static/POSCAR\ncp 02_static/POSCAR 03_dos/POSCAR\ncp 02_static/CHGCAR 03_dos/CHGCAR\ncp KPOINTS_dos 03_dos/KPOINTS"
  },
  {
    title: "电荷差分",
    purpose: "分析成键、电荷转移、吸附前后电子密度变化。",
    figureRefs: [
      figureReferenceLibrary.heuslerOhmicInterface
    ],
    needs: ["复合体系 CHGCAR", "片段 A 的 CHGCAR", "片段 B 的 CHGCAR", "完全一致的晶胞和 FFT 网格"],
    models: ["整体体系模型", "去掉 B 后的 A 片段模型", "去掉 A 后的 B 片段模型"],
    formula: "\\Delta \\rho = \\rho_{total} - \\rho_A - \\rho_B",
    output: ["CHGCAR_total", "CHGCAR_A", "CHGCAR_B", "差分电荷密度文件"],
    code: "mkdir 01_total 02_part_A 03_part_B 04_charge_difference\ncp total_POSCAR 01_total/POSCAR\ncp part_A_POSCAR 02_part_A/POSCAR\ncp part_B_POSCAR 03_part_B/POSCAR"
  },
  {
    title: "Bader 电荷",
    purpose: "定量分析每个原子得失电子，常用于吸附、缺陷、电荷转移研究。",
    figureRefs: [
      figureReferenceLibrary.fePcBader
    ],
    needs: ["静态计算 CHGCAR", "LAECHG = .TRUE.", "AECCAR0", "AECCAR2", "Bader 程序"],
    models: ["高精度静态模型", "全电子电荷密度输出模型"],
    formula: "",
    output: ["ACF.dat", "BvAtxxxx.dat", "CHGCAR_sum", "每个原子的 Bader 电荷"],
    code: "mkdir 01_static 02_bader\ncp 01_static/CHGCAR 02_bader/CHGCAR\ncp 01_static/AECCAR0 02_bader/AECCAR0\ncp 01_static/AECCAR2 02_bader/AECCAR2"
  },
  {
    title: "NEB 迁移能垒",
    purpose: "计算扩散、反应、吸附位点迁移的最小能量路径和能垒。",
    figureRefs: [
      figureReferenceLibrary.co2ReductionNeb
    ],
    needs: ["初态结构", "终态结构", "中间插值结构", "NEB INCAR", "每个 image 的 POSCAR"],
    models: ["00 初态模型", "01-N 中间 image 模型", "最后一个终态模型"],
    formula: "E_{barrier} = \\max(E_{image}) - E_{initial}",
    output: ["neb.dat", "每个 image 的 OUTCAR/OSZICAR", "最高能 image", "迁移能垒"],
    code: "mkdir 00 01 02 03 04\ncp initial_POSCAR 00/POSCAR\ncp image_01_POSCAR 01/POSCAR\ncp image_02_POSCAR 02/POSCAR\ncp image_03_POSCAR 03/POSCAR\ncp final_POSCAR 04/POSCAR"
  }
];

const taskCalculations = {
  "结构优化 / 总能": [
    ["优化后结构", "检查 CONTCAR、力收敛和总能"],
    ["静态总能", "用于后续能量差计算"],
    ["每原子能量", "E_{bulk}^{atom} = \\frac{E_{bulk}}{N_{atoms}}"]
  ],
  "表面能": [
    ["体相模型能量", "E_{bulk}"],
    ["干净 slab 模型能量", "E_{slab}"],
    ["slab 表面积", "A"],
    ["slab 中原子数", "N"]
  ],
  "吸附能": [
    ["干净 slab 能量", "E_{slab}"],
    ["单独吸附物能量", "E_{adsorbate}"],
    ["slab+吸附物整体能量", "E_{slab+adsorbate}"],
    ["不同吸附位点能量", "top / bridge / hollow 可分别比较"]
  ],
  "空位形成能": [
    ["完美超胞能量", "E_{perfect}"],
    ["空位超胞能量", "E_{vacancy}"],
    ["被移除元素化学势", "\\mu_{removed}"]
  ],
  "替位形成能": [
    ["完美超胞能量", "E_{perfect}"],
    ["替位超胞能量", "E_{substitution}"],
    ["加入元素化学势", "\\mu_{added}"],
    ["被替换元素化学势", "\\mu_{removed}"]
  ],
  "间隙形成能": [
    ["完美超胞能量", "E_{perfect}"],
    ["间隙原子超胞能量", "E_{interstitial}"],
    ["加入元素化学势", "\\mu_{added}"],
    ["不同间隙位点能量", "选择最低能构型"]
  ],
  "能带结构": [
    ["静态自洽电荷密度", "CHGCAR"],
    ["高对称路径能带", "EIGENVAL / vasprun.xml"],
    ["费米能级", "OUTCAR 中 E-fermi"],
    ["带隙位置", "VBM / CBM"]
  ],
  "态密度 / 分波态密度": [
    ["总态密度", "DOSCAR / vasprun.xml"],
    ["分波态密度", "元素和轨道投影"],
    ["费米能级", "OUTCAR 中 E-fermi"],
    ["费米能级附近贡献", "判断主要元素和轨道"]
  ],
  "电荷差分": [
    ["整体体系电荷密度", "\\rho_{total}"],
    ["片段 A 电荷密度", "\\rho_A"],
    ["片段 B 电荷密度", "\\rho_B"],
    ["差分电荷密度", "\\Delta \\rho"]
  ],
  "Bader 电荷": [
    ["总电荷密度", "CHGCAR"],
    ["全电子电荷密度", "AECCAR0 + AECCAR2"],
    ["Bader 分析结果", "ACF.dat"],
    ["原子得失电子", "对比价电子数和 Bader 电荷"]
  ],
  "NEB 迁移能垒": [
    ["初态能量", "E_{initial}"],
    ["终态能量", "E_{final}"],
    ["所有 image 能量", "E_{image}"],
    ["最高能 image", "\\max(E_{image})"]
  ]
};

structureOptions.forEach((option) => {
  option.checklist = (taskCalculations[option.title] || []).map(([item, note]) => ({ item, note }));
});

const templates = {
  relax: {
    label: "结构优化",
    lines: [
      ["SYSTEM", "structure relaxation"],
      ["ENCUT", "520"],
      ["EDIFF", "1E-5"],
      ["EDIFFG", "-0.02"],
      ["ISMEAR", "0"],
      ["SIGMA", "0.05"],
      ["IBRION", "2"],
      ["ISIF", "3"],
      ["NSW", "100"],
      ["PREC", "Accurate"],
      ["LREAL", "Auto"],
      ["LWAVE", ".FALSE."],
      ["LCHARG", ".FALSE."]
    ]
  },
  static: {
    label: "静态计算",
    lines: [
      ["SYSTEM", "static calculation"],
      ["ENCUT", "520"],
      ["EDIFF", "1E-6"],
      ["ISMEAR", "0"],
      ["SIGMA", "0.05"],
      ["IBRION", "-1"],
      ["NSW", "0"],
      ["PREC", "Accurate"],
      ["LREAL", ".FALSE."],
      ["LWAVE", ".TRUE."],
      ["LCHARG", ".TRUE."],
      ["LAECHG", ".TRUE."]
    ]
  },
  band: {
    label: "能带计算",
    lines: [
      ["SYSTEM", "band structure"],
      ["ENCUT", "520"],
      ["EDIFF", "1E-6"],
      ["ISMEAR", "0"],
      ["SIGMA", "0.05"],
      ["IBRION", "-1"],
      ["NSW", "0"],
      ["ICHARG", "11"],
      ["LORBIT", "11"],
      ["LWAVE", ".FALSE."],
      ["LCHARG", ".FALSE."]
    ]
  },
  dos: {
    label: "态密度",
    lines: [
      ["SYSTEM", "density of states"],
      ["ENCUT", "520"],
      ["EDIFF", "1E-6"],
      ["ISMEAR", "-5"],
      ["SIGMA", "0.05"],
      ["IBRION", "-1"],
      ["NSW", "0"],
      ["LORBIT", "11"],
      ["NEDOS", "2000"],
      ["LWAVE", ".FALSE."],
      ["LCHARG", ".TRUE."]
    ]
  },
  all: {
    label: "所有参数",
    lines: []
  }
};

const tagInfo = {
  SYSTEM: {
    category: "标识",
    summary: "给当前计算写一个项目说明，便于在输出文件中辨认任务。",
    note: "不影响物理计算结果，但建议每个模板都写清楚体系和任务类型。",
    values: [
      ["任意文本", "写入本次任务名称，例如 structure relaxation、static calculation。"]
    ]
  },
  ENCUT: {
    category: "平面波基组",
    summary: "设置平面波截断能，是精度和耗时最关键的参数之一。",
    note: "应做收敛测试；通常不低于所用 POTCAR 推荐值中的最大 ENMAX。",
    values: [
      ["520", "本网页模板中的常用起点，单位 eV，适合许多 PBE 赝势的正式计算初筛。"],
      ["400-600", "常见收敛测试区间；最终值应由能量、力或目标性质收敛决定。"],
      ["ENMAX 以上", "通常取所有 POTCAR 中最大 ENMAX 以上，避免基组过小。"]
    ]
  },
  EDIFF: {
    category: "电子收敛",
    summary: "设置电子自洽循环的能量收敛标准。",
    note: "静态、能带和 DOS 计算通常比结构优化设得更严格。",
    values: [
      ["1E-5", "结构优化常用，平衡精度和计算成本。"],
      ["1E-6", "静态、能带、DOS 常用，更适合后处理和能量比较。"],
      ["更小正数", "更严格，但可能增加电子步数和计算时间。"]
    ]
  },
  EDIFFG: {
    category: "离子收敛",
    summary: "控制结构优化停止条件；负值通常表示按力收敛。",
    note: "例如 -0.02 常表示最大力达到约 0.02 eV/Angstrom 量级后停止。",
    values: [
      ["-0.02", "按力收敛；常用于普通结构优化，约 0.02 eV/Angstrom。"],
      ["-0.01", "更严格的力收敛，适合精细能量差或声子前结构。"],
      ["> 0", "按能量变化停止离子优化，而不是按力停止。"]
    ]
  },
  ISMEAR: {
    category: "占据与展宽",
    summary: "选择电子占据的展宽方法。",
    note: "金属、半导体/绝缘体和 DOS 计算适合的取值不同；DOS 常用四面体方法。",
    values: [
      ["-5", "四面体方法并带 Blochl 修正，常用于高质量 DOS 或绝缘体静态计算。"],
      ["0", "Gaussian 展宽，半导体、绝缘体和通用结构优化常用。"],
      ["1", "一阶 Methfessel-Paxton，金属结构优化常用。"],
      ["-1", "Fermi 展宽，金属体系有时用于稳定占据。"]
    ]
  },
  SIGMA: {
    category: "占据与展宽",
    summary: "设置展宽宽度，通常与 ISMEAR 配合使用。",
    note: "过大可能影响能量和 DOS 细节；半导体/绝缘体常用较小值。",
    values: [
      ["0.05", "模板默认值，适合半导体/绝缘体或较精细静态计算。"],
      ["0.1-0.2", "金属体系常见初始范围，需检查能量和占据稳定性。"],
      ["更小值", "DOS 曲线更尖锐，但可能更难收敛。"]
    ]
  },
  IBRION: {
    category: "离子运动",
    summary: "选择离子弛豫算法，或关闭离子更新。",
    note: "结构优化常用 1 或 2；静态、能带和 DOS 通常设为 -1。",
    values: [
      ["-1", "不更新离子位置；静态、能带、DOS 计算使用。"],
      ["1", "准牛顿/RMM-DIIS 类型优化，接近平衡结构时效率较好。"],
      ["2", "共轭梯度优化，结构优化常用且稳健。"],
      ["3", "阻尼分子动力学形式的优化，特殊弛豫场景使用。"]
    ]
  },
  ISIF: {
    category: "应力与晶胞",
    summary: "决定是否优化离子位置、晶胞形状和体积，以及是否计算应力。",
    note: "体相结构优化常用 3；表面或固定晶胞体系需要谨慎选择。",
    values: [
      ["2", "优化离子位置，晶胞保持不变；表面、缺陷或固定晶胞常用。"],
      ["3", "同时优化离子位置、晶胞形状和体积；体相结构优化常用。"],
      ["4", "优化离子位置和晶胞形状，通常保持体积约束。"],
      ["7", "主要优化晶胞体积，适合特定体积扫描或约束任务。"]
    ]
  },
  NSW: {
    category: "离子步数",
    summary: "设置最大离子步数。",
    note: "结构优化需要正值；静态、能带和 DOS 通常设为 0。",
    values: [
      ["0", "不做离子步；静态、能带、DOS 使用。"],
      ["50-100", "普通结构优化常用最大步数。"],
      ["> 100", "初始结构较差或复杂体系可增加，但应监控是否异常振荡。"]
    ]
  },
  PREC: {
    category: "总体精度",
    summary: "控制 FFT 网格等全局精度预设。",
    note: "正式计算常用 Accurate；快速预筛可根据成本调整。",
    values: [
      ["Normal", "默认或较常规精度，适合快速筛选。"],
      ["Accurate", "更高 FFT 网格和精度设置，正式计算常用。"],
      ["Low", "低精度快速测试，不建议用于最终结果。"]
    ]
  },
  LREAL: {
    category: "投影算符",
    summary: "决定投影算符是否在实空间处理。",
    note: "小体系或高精度静态计算常设 .FALSE.；大体系优化可用 Auto。",
    values: [
      [".FALSE.", "在倒空间处理投影，精度更可靠，静态和小体系常用。"],
      ["Auto", "由 VASP 自动选择实空间投影，大体系结构优化常用以节省时间。"],
      [".TRUE.", "强制实空间投影，速度可能更快但需谨慎检查精度。"]
    ]
  },
  LWAVE: {
    category: "输出文件",
    summary: "决定是否写出 WAVECAR。",
    note: "需要续算或后续非自洽计算时保留；节省磁盘时可关闭。",
    values: [
      [".TRUE.", "写出 WAVECAR，便于续算或作为后续计算初始波函数。"],
      [".FALSE.", "不写 WAVECAR，节省磁盘空间。"]
    ]
  },
  LCHARG: {
    category: "输出文件",
    summary: "决定是否写出 CHGCAR。",
    note: "能带、DOS、Bader 等后处理通常需要电荷密度文件。",
    values: [
      [".TRUE.", "写出 CHGCAR，后续能带、DOS、Bader 分析常需要。"],
      [".FALSE.", "不写 CHGCAR，适合不需要电荷密度后处理的优化任务。"]
    ]
  },
  LAECHG: {
    category: "输出文件",
    summary: "决定是否写出全电子电荷密度相关文件。",
    note: "常用于 Bader 电荷分析等需要 AECCAR 文件的任务。",
    values: [
      [".TRUE.", "写出 AECCAR0 和 AECCAR2，常用于 Bader 电荷分析。"],
      [".FALSE.", "不输出全电子电荷密度文件，节省磁盘空间。"]
    ]
  },
  ICHARG: {
    category: "电荷密度",
    summary: "控制初始电荷密度及是否读取已有 CHGCAR。",
    note: "能带非自洽计算常用 11，从静态计算的电荷密度开始。",
    values: [
      ["2", "由原子电荷密度叠加开始，常见默认自洽起点。"],
      ["1", "读取已有 CHGCAR 作为初始电荷密度，然后继续自洽。"],
      ["11", "读取 CHGCAR 并固定电荷密度做非自洽计算，能带常用。"]
    ]
  },
  LORBIT: {
    category: "投影输出",
    summary: "控制 PROCAR、DOSCAR 中轨道投影信息的写出方式。",
    note: "投影能带和分波 DOS 常用 11。",
    values: [
      ["0", "基础输出，通常不写详细轨道投影信息。"],
      ["10", "输出按原子投影的 DOS 信息。"],
      ["11", "输出更详细的 lm 分解投影，投影能带和分波 DOS 常用。"],
      ["12", "更高阶投影相关输出，按具体后处理需求选择。"]
    ]
  },
  NEDOS: {
    category: "态密度",
    summary: "设置 DOSCAR 中能量网格点数。",
    note: "数值越大曲线越细，但文件更大、后处理更慢。",
    values: [
      ["301", "VASP 常见默认量级，适合快速查看。"],
      ["1000-2000", "常用 DOS 绘图范围，曲线更平滑。"],
      ["> 2000", "更细能量网格，适合精细峰位分析，但文件更大。"]
    ]
  }
};

const detail = document.querySelector("#stepDetail");
const stepButtons = document.querySelectorAll(".step");
const templateCode = document.querySelector("#templateCode");
const tagPanel = document.querySelector("#tagPanel");
const tabs = document.querySelectorAll(".tab");
const pageSections = document.querySelectorAll(".page-section");
const navLinks = document.querySelectorAll(".nav-links a");
const navGroups = document.querySelectorAll(".nav-group");
const taskMenuLinks = document.querySelectorAll("[data-prep-target]");
const lineCopyButtons = document.querySelectorAll(".line-copy");
const pawFolderInput = document.querySelector("#pawFolderInput");
const poscarInput = document.querySelector("#poscarInput");
const pawStatus = document.querySelector("#pawStatus");
const poscarStatus = document.querySelector("#poscarStatus");
const periodicTable = document.querySelector("#periodicTable");
const variantPanel = document.querySelector("#variantPanel");
const selectedPotcars = document.querySelector("#selectedPotcars");
const downloadPotcar = document.querySelector("#downloadPotcar");
const clearPotcar = document.querySelector("#clearPotcar");
const fixPoscarInput = document.querySelector("#fixPoscarInput");
const fixModeButtons = document.querySelectorAll("[data-fix-mode]");
const fixModeHint = document.querySelector("#fixModeHint");
const fixToleranceLabel = document.querySelector("#fixToleranceLabel");
const fixLayerTolerance = document.querySelector("#fixLayerTolerance");
const downloadFixedPoscar = document.querySelector("#downloadFixedPoscar");
const fixerResult = document.querySelector("#fixerResult");
let activeTemplate = "relax";
let activeTag = "ENCUT";
let pawByElement = new Map();
let selectedPawList = [];
let activePawElement = "";
let activePrepIndex = 0;
let fixMode = "auto";
let fixedPoscarText = "";
let lastFixPoscarText = "";
const taskPages = ["flow", "static-calc", "band-dos", "adsorption", "defect-calc", "work-function", "charge-density"];
const inputPages = ["templates", "poscar", "potcar", "kpoints"];
const toolPages = ["potcar", "poscar-fixer", "incar-generator", "adsorption-calculator", "outcar-parser", "error-diagnosis"];
const pageIds = new Set([
  "home",
  "quickstart",
  "environment",
  ...taskPages,
  "bash",
  "faq",
  ...inputPages,
  ...toolPages,
  "perovskite"
]);

templates.all.lines = Object.keys(tagInfo)
  .sort()
  .map((tag) => [tag, tagInfo[tag].values.map(([value]) => value).join(" / ")]);

const elements = [
  ["H", 1, 1], ["He", 18, 1],
  ["Li", 1, 2], ["Be", 2, 2], ["B", 13, 2], ["C", 14, 2], ["N", 15, 2], ["O", 16, 2], ["F", 17, 2], ["Ne", 18, 2],
  ["Na", 1, 3], ["Mg", 2, 3], ["Al", 13, 3], ["Si", 14, 3], ["P", 15, 3], ["S", 16, 3], ["Cl", 17, 3], ["Ar", 18, 3],
  ["K", 1, 4], ["Ca", 2, 4], ["Sc", 3, 4], ["Ti", 4, 4], ["V", 5, 4], ["Cr", 6, 4], ["Mn", 7, 4], ["Fe", 8, 4], ["Co", 9, 4], ["Ni", 10, 4], ["Cu", 11, 4], ["Zn", 12, 4], ["Ga", 13, 4], ["Ge", 14, 4], ["As", 15, 4], ["Se", 16, 4], ["Br", 17, 4], ["Kr", 18, 4],
  ["Rb", 1, 5], ["Sr", 2, 5], ["Y", 3, 5], ["Zr", 4, 5], ["Nb", 5, 5], ["Mo", 6, 5], ["Tc", 7, 5], ["Ru", 8, 5], ["Rh", 9, 5], ["Pd", 10, 5], ["Ag", 11, 5], ["Cd", 12, 5], ["In", 13, 5], ["Sn", 14, 5], ["Sb", 15, 5], ["Te", 16, 5], ["I", 17, 5], ["Xe", 18, 5],
  ["Cs", 1, 6], ["Ba", 2, 6], ["La", 3, 8], ["Ce", 4, 8], ["Pr", 5, 8], ["Nd", 6, 8], ["Pm", 7, 8], ["Sm", 8, 8], ["Eu", 9, 8], ["Gd", 10, 8], ["Tb", 11, 8], ["Dy", 12, 8], ["Ho", 13, 8], ["Er", 14, 8], ["Tm", 15, 8], ["Yb", 16, 8], ["Lu", 17, 8], ["Hf", 4, 6], ["Ta", 5, 6], ["W", 6, 6], ["Re", 7, 6], ["Os", 8, 6], ["Ir", 9, 6], ["Pt", 10, 6], ["Au", 11, 6], ["Hg", 12, 6], ["Tl", 13, 6], ["Pb", 14, 6], ["Bi", 15, 6], ["Po", 16, 6], ["At", 17, 6], ["Rn", 18, 6],
  ["Fr", 1, 7], ["Ra", 2, 7], ["Ac", 3, 9], ["Th", 4, 9], ["Pa", 5, 9], ["U", 6, 9], ["Np", 7, 9], ["Pu", 8, 9], ["Am", 9, 9], ["Cm", 10, 9], ["Bk", 11, 9], ["Cf", 12, 9], ["Es", 13, 9], ["Fm", 14, 9], ["Md", 15, 9], ["No", 16, 9], ["Lr", 17, 9], ["Rf", 4, 7], ["Db", 5, 7], ["Sg", 6, 7], ["Bh", 7, 7], ["Hs", 8, 7], ["Mt", 9, 7], ["Ds", 10, 7], ["Rg", 11, 7], ["Cn", 12, 7], ["Nh", 13, 7], ["Fl", 14, 7], ["Mc", 15, 7], ["Lv", 16, 7], ["Ts", 17, 7], ["Og", 18, 7]
];

const elementSymbols = elements.map(([symbol]) => symbol).sort((a, b) => b.length - a.length);

function renderStep(index) {
  const step = steps[index];
  if (index === 0) {
    document.body.classList.remove("task-drawer-open");
    detail.innerHTML = `
      <aside class="task-drawer" aria-label="计算任务侧边导航">
        <button class="task-drawer-toggle" type="button" aria-label="打开计算任务导航" aria-expanded="false">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div class="task-drawer-panel">
          <h3>计算任务</h3>
          ${structureOptions
            .map(
              (option, optionIndex) => `
                <button class="prep-option drawer-option${optionIndex === 0 ? " is-active" : ""}" type="button" data-prep="${optionIndex}">
                  ${option.title}
                </button>
              `
            )
            .join("")}
        </div>
      </aside>
      <div class="task-pages" id="prepDetail"></div>
    `;

    detail.querySelectorAll(".prep-option").forEach((button) => {
      button.addEventListener("click", () => {
        selectPrepOption(Number(button.dataset.prep));
      });
    });
    setupTaskDrawer();

    renderPrepOption(0);
    return;
  }

  detail.innerHTML = `
    <div>
      <h3>${step.title}</h3>
      <ul>${step.bullets.map((item) => `<li>${item}</li>`).join("")}</ul>
    </div>
    <pre class="command-box"><code>${step.command}</code></pre>
  `;
}

function renderPrepOption(index) {
  const option = structureOptions[index];
  const target = document.querySelector("#prepDetail");
  const formulaMarkup = option.formula
    ? `
      <h4>最后计算公式</h4>
      <div class="formula-box">${latexToHtml(option.formula)}</div>
    `
    : "";
  const outputMarkup = option.output?.length
    ? `
      <h4>最后提取</h4>
      <ul>${option.output.map((item) => `<li>${item}</li>`).join("")}</ul>
    `
    : "";
  const detailMarkup = option.detail?.length
    ? `
      <div class="task-page-detail">
        ${option.detail.map((paragraph) => `<p>${paragraph}</p>`).join("")}
      </div>
    `
    : "";
  const figureRefMarkup = option.figureRefs?.length
    ? `
      <div class="task-page-section figure-reference-section">
        <h4>图例文献参考</h4>
        <div class="figure-reference-list">
          ${option.figureRefs
            .map(
              (reference) => `
                <a class="figure-reference-card" href="${reference.url}" target="_blank" rel="noreferrer">
                  <div class="figure-reference-visual">
                    <img src="${reference.image}" alt="${reference.title}" loading="lazy" referrerpolicy="no-referrer" />
                  </div>
                  <div class="figure-reference-body">
                    <span>${reference.journal}</span>
                    <strong>${reference.title}</strong>
                    <p>${reference.note}</p>
                    <small>${reference.figure ? `${reference.figure} · ` : ""}DOI: ${reference.doi}</small>
                  </div>
                </a>
              `
            )
            .join("")}
        </div>
      </div>
    `
    : "";
  target.innerHTML = `
    <article class="task-page">
      <div class="task-page-hero">
        <h3>${option.title}</h3>
        <p>${option.purpose}</p>
      </div>
      ${detailMarkup}
      ${figureRefMarkup}
      <div class="task-page-section">
        <h4>需要计算</h4>
        <ul class="prep-checklist">
          ${option.checklist
            .map(
              (entry) => `
                <li>
                  <span>${entry.item}</span>
                  ${entry.note ? `<small>${latexToHtml(entry.note)}</small>` : ""}
                </li>
              `
            )
            .join("")}
        </ul>
      </div>
      ${formulaMarkup ? `<div class="task-page-section">${formulaMarkup}</div>` : ""}
      ${outputMarkup ? `<div class="task-page-section">${outputMarkup}</div>` : ""}
    </article>
  `;
}

function setupTaskDrawer() {
  const drawer = detail.querySelector(".task-drawer");
  const toggle = detail.querySelector(".task-drawer-toggle");
  if (!drawer || !toggle) return;

  toggle.addEventListener("click", () => {
    const isOpen = drawer.classList.toggle("is-open");
    document.body.classList.toggle("task-drawer-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

function selectPrepOption(index) {
  const optionIndex = Math.max(0, Math.min(index, structureOptions.length - 1));
  activePrepIndex = optionIndex;
  if (!document.querySelector("#prepDetail")) {
    renderStep(0);
  }
  const buttons = detail.querySelectorAll(".prep-option");
  buttons.forEach((item) => item.classList.remove("is-active"));
  buttons[optionIndex]?.classList.add("is-active");
  taskMenuLinks.forEach((link) => {
    link.classList.toggle("is-active", Number(link.dataset.prepTarget) === optionIndex);
  });
  renderPrepOption(optionIndex);
}

function latexToHtml(source) {
  function readGroup(text, start) {
    let depth = 0;
    let content = "";
    for (let i = start; i < text.length; i++) {
      const char = text[i];
      if (char === "{") {
        if (depth > 0) content += char;
        depth++;
      } else if (char === "}") {
        depth--;
        if (depth === 0) return [content, i + 1];
        content += char;
      } else {
        content += char;
      }
    }
    return [content, text.length];
  }

  function parse(text) {
    let output = "";
    for (let i = 0; i < text.length; i++) {
      if (text.startsWith("\\frac", i)) {
        const [top, topEnd] = readGroup(text, i + 5);
        const [bottom, bottomEnd] = readGroup(text, topEnd);
        output += `<span class="fraction"><span>${parse(top)}</span><span>${parse(bottom)}</span></span>`;
        i = bottomEnd - 1;
        continue;
      }

      if (text.startsWith("\\gamma", i)) {
        output += "γ";
        i += 5;
        continue;
      }

      if (text.startsWith("\\Delta", i)) {
        output += "Δ";
        i += 5;
        continue;
      }

      if (text.startsWith("\\rho", i)) {
        output += "ρ";
        i += 3;
        continue;
      }

      if (text.startsWith("\\mu", i)) {
        output += "μ";
        i += 2;
        continue;
      }

      if (text.startsWith("\\max", i)) {
        output += "max";
        i += 3;
        continue;
      }

      if (text[i] === "_" || text[i] === "^") {
        const tag = text[i] === "_" ? "sub" : "sup";
        if (text[i + 1] === "{") {
          const [content, end] = readGroup(text, i + 1);
          output += `<${tag}>${parse(content)}</${tag}>`;
          i = end - 1;
        } else if (text[i + 1]) {
          output += `<${tag}>${escapeHtml(text[i + 1])}</${tag}>`;
          i++;
        }
        continue;
      }

      output += escapeHtml(text[i]);
    }
    return output;
  }

  return parse(source);
}

function currentPageFromHash() {
  const page = window.location.hash.replace("#", "") || "home";
  return pageIds.has(page) ? page : "home";
}

function showPage(page) {
  if (page !== "flow") {
    document.body.classList.remove("task-drawer-open");
  }

  pageSections.forEach((section) => {
    section.hidden = section.dataset.page !== page;
  });

  navLinks.forEach((link) => {
    const prepTarget = link.dataset.prepTarget;
    const isActivePrep = prepTarget !== undefined && page === "flow" && Number(prepTarget) === activePrepIndex;
    const isActivePage = prepTarget === undefined && link.getAttribute("href") === `#${page}`;
    link.classList.toggle("is-active", isActivePage || isActivePrep);
  });
  navGroups.forEach((group) => {
    const name = group.dataset.navGroup;
    const isActive =
      (name === "tasks" && taskPages.includes(page)) ||
      (name === "inputs" && inputPages.includes(page)) ||
      (name === "tools" && toolPages.includes(page));
    group.classList.toggle("is-active", isActive);
  });

  if (page === "home") {
    window.scrollTo({ top: 0, behavior: "auto" });
  } else {
    window.scrollTo({ top: 0, behavior: "auto" });
  }
}

window.addEventListener("hashchange", () => {
  showPage(currentPageFromHash());
});

taskMenuLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const targetIndex = Number(link.dataset.prepTarget);
    if (window.location.hash !== "#flow") {
      window.location.hash = "flow";
    }
    showPage("flow");
    renderStep(0);
    selectPrepOption(targetIndex);
  });
});

stepButtons.forEach((button) => {
  button.addEventListener("click", () => {
    stepButtons.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    renderStep(Number(button.dataset.step));
  });
});

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((item) => item.classList.remove("is-active"));
    tab.classList.add("is-active");
    activeTemplate = tab.dataset.template;
    activeTag = templates[activeTemplate].lines[1][0];
    renderTemplate(activeTemplate);
  });
});

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.append(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

function setLineCopyState(button, copied) {
  button.textContent = copied ? "✓" : "⧉";
  button.classList.toggle("is-copied", copied);
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function splitBashLine(line) {
  const index = line.indexOf("#");
  if (index < 0) return { command: line, comment: "" };
  if (index === 0) return { command: "", comment: line };
  return {
    command: line.slice(0, index).trimEnd(),
    comment: line.slice(index)
  };
}

function linkedBashTokens(command, comment) {
  const ignored = new Set([
    "cd",
    "cp",
    "do",
    "done",
    "for",
    "grep",
    "less",
    "ls",
    "mkdir",
    "mpirun",
    "mv",
    "nohup",
    "pwd",
    "rm",
    "sbatch",
    "squeue",
    "tail",
    "vasp_std"
  ]);
  return Array.from(command.matchAll(/[A-Za-z0-9_./$-]+/g))
    .map(([token]) => token.replace(/^["']|["']$/g, ""))
    .filter((token) => token.length > 1)
    .filter((token) => !token.startsWith("-"))
    .filter((token) => !ignored.has(token))
    .filter((token) => comment.includes(token))
    .filter((token, index, list) => list.indexOf(token) === index)
    .sort((a, b) => b.length - a.length);
}

function highlightLinkedTokens(text, tokens) {
  const escaped = escapeHtml(text);
  return tokens.reduce((output, token) => {
    const pattern = new RegExp(escapeRegExp(escapeHtml(token)), "g");
    return output.replace(pattern, `<span class="bash-linked-token">${escapeHtml(token)}</span>`);
  }, escaped);
}

function enhanceBashLines() {
  document.querySelectorAll(".bash-line").forEach((line) => {
    if (line.classList.contains("is-gap")) return;
    const code = line.querySelector(".bash-line-code");
    if (!code) return;
    const raw = code.textContent;
    const { command, comment } = splitBashLine(raw);
    line.dataset.copyText = command;
    if (!comment || !command) return;

    const tokens = linkedBashTokens(command, comment);
    code.innerHTML = `<span class="bash-command">${highlightLinkedTokens(command, tokens)}</span><span class="bash-comment">${highlightLinkedTokens(comment, tokens)}</span>`;
  });
}

function officialUrl(tag) {
  return `https://www.vasp.at/wiki/index.php/${encodeURIComponent(tag)}`;
}

function templatesUsing(tag) {
  return Object.values(templates)
    .filter((template) => template.label !== "所有参数")
    .filter((template) => template.lines.some(([name]) => name === tag))
    .map((template) => template.label);
}

function renderTemplate(templateKey) {
  const template = templates[templateKey];
  templateCode.innerHTML = template.lines
    .map(([tag, value]) => {
      const info = tagInfo[tag];
      const tagHtml = info
        ? `<button class="incar-tag${tag === activeTag ? " is-selected" : ""}" data-tag="${tag}" type="button">${tag}</button>`
        : `<span class="plain-tag">${tag}</span>`;
      return `<span class="incar-line">${tagHtml}<span class="equals">=</span><span class="value">${escapeHtml(value)}</span></span>`;
    })
    .join("\n");

  templateCode.querySelectorAll(".incar-tag").forEach((button) => {
    button.addEventListener("click", () => {
      activeTag = button.dataset.tag;
      renderTemplate(activeTemplate);
      renderTagPanel(activeTag);
    });
  });

  renderTagPanel(activeTag);
}

function renderTagPanel(tag) {
  const info = tagInfo[tag];
  if (!info) {
    tagPanel.innerHTML = "";
    return;
  }

  const usedIn = templatesUsing(tag)
    .map((name) => `<span class="usage-chip">${name}</span>`)
    .join("");
  const valueRows = info.values
    .map(
      ([value, meaning]) => `
        <div class="value-row">
          <span class="value-key">${escapeHtml(value)}</span>
          <span class="value-meaning">${escapeHtml(meaning)}</span>
        </div>
      `
    )
    .join("");

  tagPanel.innerHTML = `
    <p class="panel-label">INCAR Tag</p>
    <h3>${tag}</h3>
    <span class="tag-category">${info.category}</span>
    <p>${info.summary}</p>
    <p class="tag-note">${info.note}</p>
    <div class="value-guide">
      <h4>常用取值</h4>
      ${valueRows}
    </div>
    <div class="usage-list" aria-label="${tag} 出现的模板">${usedIn}</div>
    <a class="manual-link" href="${officialUrl(tag)}" target="_blank" rel="noreferrer">查看 VASP Wiki 官方说明</a>
    <a class="manual-link secondary-manual-link" href="https://www.vasp.at/wiki/index.php/INCAR" target="_blank" rel="noreferrer">打开 INCAR 官方总页</a>
  `;
}

function getPotentialLabel(file) {
  const path = file.webkitRelativePath || file.name;
  const parts = path.split("/");
  return parts.length >= 2 ? parts[parts.length - 2] : file.name.replace(/\/?POTCAR$/, "");
}

function getElementFromPotential(label) {
  return elementSymbols.find((symbol) => label === symbol || label.startsWith(symbol + "_") || label.startsWith(symbol + ".") || label.startsWith(symbol + "1")) || "";
}

function renderPeriodicTable() {
  periodicTable.innerHTML = elements
    .map(([symbol, column, row]) => {
      const count = pawByElement.get(symbol)?.length || 0;
      const enabled = count > 0;
      return `
        <button
          class="element-tile${enabled ? " has-paw" : ""}${symbol === activePawElement ? " is-selected" : ""}"
          type="button"
          data-symbol="${symbol}"
          style="grid-column:${column};grid-row:${row};"
          ${enabled ? "" : "disabled"}
          title="${enabled ? `${symbol}: ${count} 个 PAW 文件` : `${symbol}: 未读取到 PAW 文件`}"
        >
          <span>${symbol}</span>
          <small>${count || ""}</small>
        </button>
      `;
    })
    .join("");

  periodicTable.querySelectorAll(".element-tile").forEach((button) => {
    button.addEventListener("click", () => {
      setActivePawElement(button.dataset.symbol);
      renderVariants(activePawElement);
    });
  });
}

function setActivePawElement(symbol) {
  activePawElement = symbol;
  periodicTable.querySelectorAll(".element-tile").forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.symbol === symbol);
  });
}

function renderVariants(symbol) {
  const variants = pawByElement.get(symbol) || [];
  if (!variants.length) {
    variantPanel.innerHTML = `
      <p class="panel-label">PAW Variants</p>
      <h3>${symbol}</h3>
      <p>没有在已选择的文件夹中找到 ${symbol} 的 POTCAR。</p>
    `;
    return;
  }

  variantPanel.innerHTML = `
    <p class="panel-label">PAW Variants</p>
    <h3>${symbol}</h3>
    <p>选择一个 PAW 文件加入合成顺序。顺序应与 POSCAR 中元素顺序一致。</p>
    <div class="variant-list">
      ${variants
        .map(
          (variant, index) => `
            <button class="variant-button" type="button" data-symbol="${symbol}" data-index="${index}">
              <strong>${escapeHtml(variant.label)}</strong>
              <span>${escapeHtml(variant.path)}</span>
            </button>
          `
        )
        .join("")}
    </div>
  `;

  variantPanel.querySelectorAll(".variant-button").forEach((button) => {
    button.addEventListener("click", () => {
      const variant = pawByElement.get(button.dataset.symbol)[Number(button.dataset.index)];
      selectedPawList.push(variant);
      renderSelectedPotcars();
    });
  });
}

function renderSelectedPotcars() {
  if (!selectedPawList.length) {
    selectedPotcars.innerHTML = `<p class="empty-order">还没有选择 PAW 文件。</p>`;
    downloadPotcar.disabled = true;
    return;
  }

  selectedPotcars.innerHTML = selectedPawList
    .map(
      (item, index) => `
        <div class="potcar-item">
          <span class="order-index">${index + 1}</span>
          <div>
            <strong>${escapeHtml(item.element)} - ${escapeHtml(item.label)}</strong>
            <small>${escapeHtml(item.path)}</small>
          </div>
          <button type="button" data-remove="${index}" aria-label="删除 ${escapeHtml(item.label)}">删除</button>
        </div>
      `
    )
    .join("");
  downloadPotcar.disabled = false;

  selectedPotcars.querySelectorAll("[data-remove]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedPawList.splice(Number(button.dataset.remove), 1);
      renderSelectedPotcars();
    });
  });
}

function parsePoscarElements(text) {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  if (lines.length < 6) return [];

  const candidate = lines[5].split(/\s+/).filter(Boolean);
  const hasElementLine = candidate.every((token) => elementSymbols.includes(token));
  if (hasElementLine) return candidate;

  const titleTokens = lines[0].split(/\s+/).filter(Boolean);
  return titleTokens.filter((token) => elementSymbols.includes(token));
}

function parseScale(line) {
  const values = line.trim().split(/\s+/).map(Number).filter((value) => Number.isFinite(value));
  return values[0] || 1;
}

function parseVector(line, scale) {
  return line
    .trim()
    .split(/\s+/)
    .slice(0, 3)
    .map((value) => Number(value) * scale);
}

function determinant3(matrix) {
  const [a, b, c] = matrix;
  return (
    a[0] * (b[1] * c[2] - b[2] * c[1]) -
    a[1] * (b[0] * c[2] - b[2] * c[0]) +
    a[2] * (b[0] * c[1] - b[1] * c[0])
  );
}

function latticeColumns(lattice) {
  return [
    [lattice[0][0], lattice[1][0], lattice[2][0]],
    [lattice[0][1], lattice[1][1], lattice[2][1]],
    [lattice[0][2], lattice[1][2], lattice[2][2]]
  ];
}

function solve3x3Columns(columns, vector) {
  const det = determinant3(columns);
  if (Math.abs(det) < 1e-12) throw new Error("晶格矩阵奇异，无法换算 Cartesian 坐标。");
  return columns.map((_, columnIndex) => {
    const replaced = columns.map((column) => [...column]);
    for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
      replaced[rowIndex][columnIndex] = vector[rowIndex];
    }
    return determinant3(replaced) / det;
  });
}

function vectorLength(vector) {
  return Math.sqrt(vector.reduce((sum, value) => sum + value * value, 0));
}

function parsePoscarForFixing(text) {
  const lines = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n");
  const nonEmpty = lines.map((line, index) => ({ line, index })).filter((entry) => entry.line.trim());
  if (nonEmpty.length < 8) throw new Error("POSCAR 内容太短，无法识别晶格和坐标。");

  const scale = parseScale(nonEmpty[1].line);
  const lattice = [nonEmpty[2].line, nonEmpty[3].line, nonEmpty[4].line].map((line) => parseVector(line, scale));
  const columns = latticeColumns(lattice);
  const cLength = vectorLength(lattice[2]);
  const line5Tokens = nonEmpty[5].line.trim().split(/\s+/);
  const hasElementLine = line5Tokens.every((token) => elementSymbols.includes(token));
  const elements = hasElementLine
    ? line5Tokens
    : nonEmpty[0].line.trim().split(/\s+/).filter((token) => elementSymbols.includes(token));
  const countLineIndex = hasElementLine ? 6 : 5;
  const counts = nonEmpty[countLineIndex].line.trim().split(/\s+/).map(Number);
  if (!counts.length || counts.some((value) => !Number.isInteger(value) || value < 0)) {
    throw new Error("未识别到有效的元素数量行。");
  }
  if (!elements.length || elements.length !== counts.length) {
    throw new Error("未识别到元素行，或元素数量与计数行不一致。请使用 VASP5 格式 POSCAR。");
  }

  let modeLineIndex = countLineIndex + 1;
  let hasSelectiveDynamics = /^s/i.test(nonEmpty[modeLineIndex]?.line.trim() || "");
  if (hasSelectiveDynamics) modeLineIndex += 1;
  const modeLine = nonEmpty[modeLineIndex]?.line.trim() || "";
  const isDirect = /^d/i.test(modeLine);
  const isCartesian = /^c|^k/i.test(modeLine);
  if (!isDirect && !isCartesian) throw new Error("未识别 Direct 或 Cartesian 坐标模式。");

  const totalAtoms = counts.reduce((sum, count) => sum + count, 0);
  const coordStart = modeLineIndex + 1;
  if (nonEmpty.length < coordStart + totalAtoms) throw new Error("坐标行数量少于元素计数总数。");

  const atomElements = counts.flatMap((count, elementIndex) => Array.from({ length: count }, () => elements[elementIndex]));
  const atoms = Array.from({ length: totalAtoms }, (_, atomIndex) => {
    const entry = nonEmpty[coordStart + atomIndex];
    const parts = entry.line.trim().split(/\s+/);
    const coords = parts.slice(0, 3).map(Number);
    if (coords.some((value) => !Number.isFinite(value))) throw new Error(`第 ${atomIndex + 1} 个原子坐标无法识别。`);
    const cartesian = isDirect
      ? [
          coords[0] * lattice[0][0] + coords[1] * lattice[1][0] + coords[2] * lattice[2][0],
          coords[0] * lattice[0][1] + coords[1] * lattice[1][1] + coords[2] * lattice[2][1],
          coords[0] * lattice[0][2] + coords[1] * lattice[1][2] + coords[2] * lattice[2][2]
        ]
      : coords.map((value) => value * scale);
    const fracZ = isDirect ? coords[2] : solve3x3Columns(columns, cartesian)[2];
    return {
      index: atomIndex + 1,
      element: atomElements[atomIndex],
      lineIndex: entry.index,
      coords,
      fracZ,
      z: fracZ * cLength,
      prefix: parts.slice(0, 3).join(" ")
    };
  });

  return {
    lines,
    nonEmpty,
    elements,
    counts,
    hasSelectiveDynamics,
    modeLineOriginalIndex: nonEmpty[modeLineIndex].index,
    cLength,
    atoms
  };
}

function chooseBottomLayer(atoms, cLength, minLayerGap) {
  const minFracZ = Math.min(...atoms.map((atom) => atom.fracZ));
  const ordered = [...atoms].sort((a, b) => a.fracZ - b.fracZ);
  for (let index = 1; index < ordered.length; index++) {
    const gap = (ordered[index].fracZ - ordered[index - 1].fracZ) * cLength;
    if (gap >= minLayerGap) {
      const fixed = ordered.slice(0, index).sort((a, b) => a.index - b.index);
      const maxFracZ = Math.max(...fixed.map((atom) => atom.fracZ));
      return {
        atoms: fixed,
        mode: "自动层间距",
        toleranceAngstrom: (maxFracZ - minFracZ) * cLength,
        minLayerGap
      };
    }
  }

  const fallbackTolerance = 0.35;
  return {
    atoms: atoms.filter((atom) => atom.fracZ <= minFracZ + fallbackTolerance / cLength),
    mode: "备用厚度",
    toleranceAngstrom: fallbackTolerance,
    minLayerGap
  };
}

function chooseBottomLayerByThickness(atoms, cLength, thickness) {
  const minFracZ = Math.min(...atoms.map((atom) => atom.fracZ));
  const fixed = atoms
    .filter((atom) => atom.fracZ <= minFracZ + thickness / cLength)
    .sort((a, b) => a.index - b.index);
  return {
    atoms: fixed,
    mode: "手动厚度",
    toleranceAngstrom: thickness,
    minLayerGap: null
  };
}

function updateFixModeUi() {
  fixModeButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.fixMode === fixMode);
  });
  if (fixMode === "manual") {
    if (fixToleranceLabel) fixToleranceLabel.textContent = "固定厚度 / Å";
    if (fixLayerTolerance) {
      fixLayerTolerance.value = fixLayerTolerance.dataset.manualValue || "0.80";
      fixLayerTolerance.min = "0.01";
      fixLayerTolerance.step = "0.05";
    }
    if (fixModeHint) fixModeHint.textContent = "从最低原子开始，固定指定厚度范围内的所有原子。";
  } else {
    if (fixToleranceLabel) fixToleranceLabel.textContent = "分层间隙阈值 / Å";
    if (fixLayerTolerance) {
      fixLayerTolerance.value = fixLayerTolerance.dataset.autoValue || "0.45";
      fixLayerTolerance.min = "0.05";
      fixLayerTolerance.step = "0.05";
    }
    if (fixModeHint) fixModeHint.textContent = "自动寻找最底层与上一层之间的明显层间距。";
  }
}

function summarizeFixedAtoms(atoms) {
  return atoms.reduce((summary, atom) => {
    summary[atom.element] = (summary[atom.element] || 0) + 1;
    return summary;
  }, {});
}

function summarizeElementCounts(atoms) {
  return Object.entries(summarizeFixedAtoms(atoms))
    .map(([element, count]) => `${element} ${count}`)
    .join("，");
}

function analyzeSlabLayers(atoms, cLength, minLayerGap) {
  const ordered = [...atoms].sort((a, b) => a.fracZ - b.fracZ);
  const layers = [];
  let currentLayer = [ordered[0]];

  for (let index = 1; index < ordered.length; index++) {
    const gap = (ordered[index].fracZ - ordered[index - 1].fracZ) * cLength;
    if (gap >= minLayerGap) {
      layers.push(currentLayer);
      currentLayer = [ordered[index]];
    } else {
      currentLayer.push(ordered[index]);
    }
  }
  layers.push(currentLayer);

  return layers.map((layer, index) => {
    const minFracZ = Math.min(...layer.map((atom) => atom.fracZ));
    const maxFracZ = Math.max(...layer.map((atom) => atom.fracZ));
    const nextLayer = layers[index + 1];
    const gapToNext = nextLayer
      ? (Math.min(...nextLayer.map((atom) => atom.fracZ)) - maxFracZ) * cLength
      : null;
    return {
      index: index + 1,
      atoms: layer.sort((a, b) => a.index - b.index),
      minFracZ,
      maxFracZ,
      thickness: (maxFracZ - minFracZ) * cLength,
      gapToNext,
      elements: summarizeElementCounts(layer)
    };
  });
}

function buildFixedPoscar(parsed, fixedAtoms) {
  const fixedSet = new Set(fixedAtoms.map((atom) => atom.index));
  const output = [...parsed.lines];
  const offset = parsed.hasSelectiveDynamics ? 0 : 1;
  if (!parsed.hasSelectiveDynamics) {
    output.splice(parsed.modeLineOriginalIndex, 0, "Selective dynamics");
  }

  parsed.atoms.forEach((atom) => {
    const targetLine = atom.lineIndex + offset;
    const flags = fixedSet.has(atom.index) ? "F F F" : "T T T";
    output[targetLine] = `${atom.prefix} ${flags}`;
  });

  return output.join("\n").replace(/\n*$/, "\n");
}

function renderFixerError(message) {
  fixedPoscarText = "";
  if (downloadFixedPoscar) downloadFixedPoscar.disabled = true;
  if (!fixerResult) return;
  fixerResult.innerHTML = `
    <p class="panel-label">Result</p>
    <h3>无法处理 POSCAR</h3>
    <p>${escapeHtml(message)}</p>
  `;
}

function runPoscarFixer(text) {
  if (!text.trim()) {
    renderFixerError("POSCAR 为空。");
    return;
  }

  let parsed;
  try {
    parsed = parsePoscarForFixing(text);
  } catch (error) {
    renderFixerError(error.message);
    return;
  }

  const inputValue = Math.max(0.01, Number(fixLayerTolerance?.value) || (fixMode === "manual" ? 0.8 : 0.45));
  const layerGapForAnalysis = fixMode === "manual" ? 0.45 : inputValue;
  const choice = fixMode === "manual"
    ? chooseBottomLayerByThickness(parsed.atoms, parsed.cLength, inputValue)
    : chooseBottomLayer(parsed.atoms, parsed.cLength, inputValue);
  const fixedAtoms = choice.atoms;
  const layers = analyzeSlabLayers(parsed.atoms, parsed.cLength, layerGapForAnalysis);
  const bottomLayer = layers[0];
  const minZ = Math.min(...fixedAtoms.map((atom) => atom.z));
  const maxFixedZ = Math.max(...fixedAtoms.map((atom) => atom.z));
  const minFracZ = Math.min(...fixedAtoms.map((atom) => atom.fracZ));
  const maxFracZ = Math.max(...fixedAtoms.map((atom) => atom.fracZ));
  const summary = summarizeFixedAtoms(fixedAtoms);
  fixedPoscarText = buildFixedPoscar(parsed, fixedAtoms);
  if (downloadFixedPoscar) downloadFixedPoscar.disabled = fixedAtoms.length === 0;

  const elementSummary = Object.entries(summary).map(([element, count]) => `${element} ${count}`).join("，");
  const fixedIndices = fixedAtoms.map((atom) => atom.index).join(", ");
  const layerRows = layers
    .slice(0, 6)
    .map(
      (layer) => `
        <tr>
          <td>${layer.index}</td>
          <td>${layer.atoms.length}</td>
          <td>${escapeHtml(layer.elements || "无")}</td>
          <td>${layer.thickness.toFixed(4)}</td>
          <td>${layer.gapToNext === null ? "-" : layer.gapToNext.toFixed(4)}</td>
        </tr>
      `
    )
    .join("");
  const layerOmitted = layers.length > 6 ? `<p class="fixer-muted">仅显示前 6 层；当前共识别 ${layers.length} 层。</p>` : "";
  const previewRows = fixedAtoms
    .slice(0, 36)
    .map(
      (atom) => `
        <tr>
          <td>${atom.index}</td>
          <td>${atom.element}</td>
          <td>${atom.fracZ.toFixed(6)}</td>
        </tr>
      `
    )
    .join("");
  const omitted = fixedAtoms.length > 36 ? `<p class="fixer-muted">仅预览前 36 个固定原子，其余可在下载的 POSCAR 中检查。</p>` : "";

  fixerResult.innerHTML = `
    <p class="panel-label">Result</p>
    <h3>已判定最底层固定原子</h3>
    <div class="fixer-summary-grid">
      <div><span>固定原子数</span><strong>${fixedAtoms.length} / ${parsed.atoms.length}</strong></div>
      <div><span>固定元素</span><strong>${escapeHtml(elementSummary || "无")}</strong></div>
      <div><span>c 坐标范围</span><strong>${minFracZ.toFixed(6)} - ${maxFracZ.toFixed(6)}</strong></div>
      <div><span>层厚估计</span><strong>${(maxFixedZ - minZ).toFixed(4)} Å</strong></div>
      <div><span>底层厚度</span><strong>${bottomLayer.thickness.toFixed(4)} Å</strong></div>
      <div><span>底层到第二层</span><strong>${bottomLayer.gapToNext === null ? "-" : `${bottomLayer.gapToNext.toFixed(4)} Å`}</strong></div>
      <div><span>判定方式</span><strong>${choice.mode}</strong></div>
      <div><span>${fixMode === "manual" ? "手动固定厚度" : "分层间隙阈值"}</span><strong>${inputValue.toFixed(2)} Å</strong></div>
    </div>
    <div class="fixer-layer-analysis">
      <h4>层分析</h4>
      <p class="fixer-muted">按 c 方向坐标排序，间距大于 ${layerGapForAnalysis.toFixed(2)} Å 时判定为新一层。可用底层厚度和层间距判断固定范围是否合理。</p>
      <div class="fixer-table-wrap">
        <table>
          <thead><tr><th>层</th><th>原子数</th><th>元素</th><th>层内厚度 / Å</th><th>到下一层 / Å</th></tr></thead>
          <tbody>${layerRows}</tbody>
        </table>
      </div>
      ${layerOmitted}
    </div>
    <p class="fixer-muted">固定原子序号：${escapeHtml(fixedIndices || "无")}</p>
    <div class="fixer-table-wrap">
      <table>
        <thead><tr><th>序号</th><th>元素</th><th>c 方向坐标</th></tr></thead>
        <tbody>${previewRows}</tbody>
      </table>
    </div>
    ${omitted}
  `;
}

function pickDefaultPaw(element) {
  const variants = pawByElement.get(element) || [];
  return variants.find((variant) => variant.label === element) || variants[0] || null;
}

async function readPoscarFile(file) {
  if (!file) return;
  poscarStatus.classList.remove("is-ready");
  const elementsFromPoscar = parsePoscarElements(await file.text());
  if (!elementsFromPoscar.length) {
    poscarStatus.textContent = "未识别 POSCAR 元素顺序";
    return;
  }

  const missing = [];
  selectedPawList = elementsFromPoscar
    .map((element) => {
      const variant = pickDefaultPaw(element);
      if (!variant) missing.push(element);
      return variant;
    })
    .filter(Boolean);

  poscarStatus.textContent = missing.length
    ? `POSCAR: ${elementsFromPoscar.join(" ")}；缺少 ${missing.join(" ")}`
    : `POSCAR: ${elementsFromPoscar.join(" ")}；已自动合成顺序`;
  poscarStatus.classList.toggle("is-ready", missing.length === 0);
  activePawElement = elementsFromPoscar[0] || "";
  renderPeriodicTable();
  renderSelectedPotcars();
  if (activePawElement) renderVariants(activePawElement);
}

function readPawFolder(files) {
  pawByElement = new Map();
  selectedPawList = [];
  activePawElement = "";
  pawStatus.classList.remove("is-ready");

  for (const file of files) {
    if (file.name !== "POTCAR") continue;
    const label = getPotentialLabel(file);
    const element = getElementFromPotential(label);
    if (!element) continue;
    const entry = {
      element,
      label,
      file,
      path: file.webkitRelativePath || `${label}/POTCAR`
    };
    if (!pawByElement.has(element)) pawByElement.set(element, []);
    pawByElement.get(element).push(entry);
  }

  pawByElement.forEach((variants) => {
    variants.sort((a, b) => a.label.localeCompare(b.label));
  });

  const total = Array.from(pawByElement.values()).reduce((sum, variants) => sum + variants.length, 0);
  pawStatus.textContent = total ? `已读取 ${pawByElement.size} 个元素，${total} 个 PAW 文件` : "没有找到 POTCAR 文件";
  pawStatus.classList.toggle("is-ready", total > 0);
  renderPeriodicTable();
  renderSelectedPotcars();
  variantPanel.innerHTML = `
    <p class="panel-label">PAW Variants</p>
    <h3>选择元素</h3>
    <p>周期表中带数字的元素已读取到 PAW 文件。点击元素后选择具体版本。</p>
  `;
}

async function downloadCombinedPotcar() {
  if (!selectedPawList.length) return;
  const chunks = [];
  for (const item of selectedPawList) {
    chunks.push(await item.file.text());
    chunks.push("\\n");
  }
  const blob = new Blob(chunks, { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "POTCAR";
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

pawFolderInput?.addEventListener("change", (event) => {
  readPawFolder(event.target.files || []);
  event.target.value = "";
});

poscarInput?.addEventListener("change", (event) => {
  readPoscarFile(event.target.files?.[0]);
});

downloadPotcar?.addEventListener("click", () => {
  downloadCombinedPotcar();
});

clearPotcar?.addEventListener("click", () => {
  selectedPawList = [];
  renderSelectedPotcars();
});

fixPoscarInput?.addEventListener("change", async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  lastFixPoscarText = await file.text();
  runPoscarFixer(lastFixPoscarText);
  event.target.value = "";
});

fixLayerTolerance?.addEventListener("input", () => {
  if (fixMode === "manual") {
    fixLayerTolerance.dataset.manualValue = fixLayerTolerance.value;
  } else {
    fixLayerTolerance.dataset.autoValue = fixLayerTolerance.value;
  }
  if (lastFixPoscarText) runPoscarFixer(lastFixPoscarText);
});

fixModeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (fixLayerTolerance) {
      if (fixMode === "manual") {
        fixLayerTolerance.dataset.manualValue = fixLayerTolerance.value;
      } else {
        fixLayerTolerance.dataset.autoValue = fixLayerTolerance.value;
      }
    }
    fixMode = button.dataset.fixMode || "auto";
    updateFixModeUi();
    if (lastFixPoscarText) runPoscarFixer(lastFixPoscarText);
  });
});

downloadFixedPoscar?.addEventListener("click", () => {
  if (!fixedPoscarText) return;
  const blob = new Blob([fixedPoscarText], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "POSCAR_fixed";
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
});

enhanceBashLines();

lineCopyButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const line = button.closest(".bash-line");
    if (!line) return;
    try {
      await copyText(line.dataset.copyText || "");
      setLineCopyState(button, true);
      window.setTimeout(() => setLineCopyState(button, false), 1200);
    } catch {
      button.textContent = "!";
      window.setTimeout(() => setLineCopyState(button, false), 1200);
    }
  });
});

window.potcarTool = {
  readPawFolder,
  parsePoscarElements,
  readPoscarFile,
  renderVariants,
  renderSelectedPotcars
};

updateFixModeUi();
renderStep(0);
renderTemplate(activeTemplate);
renderPeriodicTable();
renderSelectedPotcars();
showPage(currentPageFromHash());
