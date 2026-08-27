"use client";

import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import { Alert, Autocomplete, Box, Button, Card, CardContent, Checkbox, Chip, FormControl, FormControlLabel, InputLabel, MenuItem, Paper, Select, Stack, Switch, TextField, Typography } from "@mui/material";
import LegacyDesignAudit from "./legacy-design-audit";
import SchedulingChallenge from "./scheduling-challenge";

export default function CleaningDoctorCaseStudyV2() {
  return <Box sx={{ mt: 8 }}>
    <SchedulingChallenge />
    <LegacyDesignAudit />
    <Box component="section" sx={{ py: { xs: 7, md: 12 }, borderTop: "1px solid", borderColor: "divider" }}>
      <Typography variant="overline" color="primary.main" sx={{ letterSpacing: 2 }}>03 · MATERIAL UI COMPONENT SYSTEM</Typography>
      <Typography component="h2" sx={{ mt: 1, fontSize: { xs: 32, md: 52 }, letterSpacing: "-.045em", fontWeight: 300 }}>One consistent system for daily operations.</Typography>
      <Typography sx={{ mt: 3, maxWidth: 800, color: "text.secondary", lineHeight: 1.9 }}>新版畫面全數使用完整的 Material UI 元件。欄位、篩選、狀態、表格與操作按鈕遵循同一套規則，讓訂單、人員、客服、公告與報酬管理的操作成本保持一致。</Typography>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" }, gap: 3, mt: 5 }}>
        <Card variant="outlined"><CardContent><Typography variant="h6">清楚的搜尋與篩選</Typography><Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 3 }}>以任務為順序分組必要條件，避免舊版把所有欄位平鋪。</Typography><Stack spacing={2}><TextField fullWidth label="清潔人員／訂單編號" /><Stack direction={{ xs: "column", sm: "row" }} spacing={2}><Autocomplete options={["新竹市北區", "新竹市東區", "新竹縣竹北市"]} renderInput={params => <TextField {...params} label="服務區域" />} sx={{ flex: 1 }} /><TextField label="服務日期" type="date" InputLabelProps={{ shrink: true }} sx={{ flex: 1 }} /></Stack><FormControl fullWidth><InputLabel id="service-type">服務條件</InputLabel><Select labelId="service-type" label="服務條件" defaultValue="home"><MenuItem value="home">居家清潔</MenuItem><MenuItem value="office">辦公室清潔</MenuItem></Select></FormControl></Stack></CardContent></Card>
        <Card variant="outlined"><CardContent><Typography variant="h6">可解讀的狀態與行動</Typography><Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 3 }}>主要行動、次要操作與例外狀態清楚區隔。</Typography><Stack spacing={2}><Stack direction="row" flexWrap="wrap" gap={1}><Chip label="最佳替補" color="success" /><Chip label="時段衝突" color="warning" /><Chip label="已通知" variant="outlined" /></Stack><FormControlLabel control={<Switch defaultChecked />} label="只顯示可立即替補的人員" /><Stack direction="row" flexWrap="wrap"><FormControlLabel control={<Checkbox defaultChecked />} label="可服務寵物家庭" /><FormControlLabel control={<Checkbox />} label="需搬重物" /></Stack><Alert severity="info">候選人依匹配度排序，仍可切換條件重新比較。</Alert><Stack direction="row" gap={1}><Button variant="outlined">儲存篩選</Button><Button variant="contained" startIcon={<AddIcon />}>比較人選</Button></Stack></Stack></CardContent></Card>
        <Paper variant="outlined" sx={{ p: 3, borderRadius: 3, gridColumn: { md: "span 2" } }}><Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" alignItems={{ md: "center" }} spacing={2}><Box><Typography variant="h6">集中修改與可追溯回饋</Typography><Typography sx={{ mt: 1, color: "text.secondary" }}>工時、獎金與替補異動集中於同一個確認流程；成功後留下通知與異動結果，不再以多個分散的「修改」按鈕中斷作業。</Typography></Box><Button variant="contained" startIcon={<SaveIcon />}>確認替補並通知</Button></Stack></Paper>
      </Box>
    </Box>
  </Box>;
}
