"use client";

import { useMemo, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { Alert, Box, Button, Card, CardContent, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";

const availableCleaners = ["林曼梅", "張家榮", "王怡婷"];
const generatedSessions = ["2026-09-03（四）", "2026-09-10（四）", "2026-09-24（四）", "2026-10-01（四）"];

export default function CleaningDoctorCaseStudyV2() {
  const [assignmentOpen, setAssignmentOpen] = useState(false);
  const [assignedCleaner, setAssignedCleaner] = useState("");
  const [generated, setGenerated] = useState(false);
  const staffLabel = useMemo(() => assignedCleaner ? `2 / 2 人 · 已補入 ${assignedCleaner}` : "1 / 2 人 · 缺 1 人", [assignedCleaner]);

  return <Box sx={{ mt: 8 }}>
    <Box component="section" sx={{ py: { xs: 7, md: 12 }, borderTop: "1px solid", borderColor: "divider" }}>
      <Typography variant="overline" color="primary.main" sx={{ letterSpacing: 2 }}>PRODUCT FEATURE HIGHLIGHTS</Typography>
      <Typography component="h2" sx={{ mt: 1, fontSize: { xs: 32, md: 52 }, letterSpacing: "-.045em", fontWeight: 300 }}>Make missing staff and recurring work visible.</Typography>
      <Typography sx={{ mt: 3, maxWidth: 760, color: "text.secondary", lineHeight: 1.9 }}>聚焦後台日常作業：先顯示場次是否缺人，讓營運人員直接補入人員；建立定期訂單時，將週期、日期範圍與例外日期轉成後續場次。</Typography>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "repeat(2, 1fr)" }, gap: 3, mt: 5 }}>
        <Card variant="outlined" sx={{ borderRadius: 3 }}><CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
          <Typography variant="overline" color="primary.main">01 · 人員缺額與補人</Typography>
          <Typography variant="h6" sx={{ mt: 1 }}>場次直接顯示缺額狀態</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 3 }}>訂單內即可看見目前人數，出現缺額時直接補人。</Typography>
          <Box sx={{ border: "1px solid", borderColor: "divider", borderRadius: 2, p: 2.5 }}>
            <Stack direction="row" justifyContent="space-between" gap={2}><Box><Typography fontWeight={700}>#CD-20260903-01</Typography><Typography variant="body2" color="text.secondary" sx={{ mt: .5 }}>09/03（四）09:00–12:00 · 新竹市北區</Typography></Box><Chip color={assignedCleaner ? "success" : "warning"} label={staffLabel} /></Stack>
            <Divider sx={{ my: 2 }} />
            <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ sm: "center" }} gap={2}><Typography variant="body2">已指派：陳小雅{assignedCleaner ? `、${assignedCleaner}` : ""}</Typography><Button variant="contained" startIcon={<PersonAddAlt1Icon />} onClick={() => setAssignmentOpen(true)} disabled={Boolean(assignedCleaner)}>補人</Button></Stack>
          </Box>
        </CardContent></Card>

        <Card variant="outlined" sx={{ borderRadius: 3 }}><CardContent sx={{ p: { xs: 2.5, md: 3.5 } }}>
          <Typography variant="overline" color="primary.main">02 · 批次產生週期場次</Typography>
          <Typography variant="h6" sx={{ mt: 1 }}>先設定規則，再建立後續場次</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 3 }}>週期、日期範圍與例外日期會作為產生場次的基礎。</Typography>
          <Stack spacing={2}><FormControl fullWidth><InputLabel id="recurrence-label">清潔週期</InputLabel><Select labelId="recurrence-label" label="清潔週期" defaultValue="weekly"><MenuItem value="weekly">每週四</MenuItem><MenuItem value="biweekly">每兩週</MenuItem></Select></FormControl><Stack direction={{ xs: "column", sm: "row" }} spacing={2}><TextField fullWidth label="開始日期" type="date" defaultValue="2026-09-03" InputLabelProps={{ shrink: true }} /><TextField fullWidth label="結束日期" type="date" defaultValue="2026-10-01" InputLabelProps={{ shrink: true }} /></Stack><Box><Typography variant="caption" color="text.secondary">日期例外</Typography><Stack direction="row" gap={1} sx={{ mt: .75 }}><Chip label="09/17 不服務" onDelete={() => {}} /></Stack></Box><Button variant="contained" startIcon={<CalendarMonthIcon />} onClick={() => setGenerated(true)}>批次產生場次</Button></Stack>
          {generated && <Alert severity="success" sx={{ mt: 2 }}>已依設定產生 {generatedSessions.length} 個場次：{generatedSessions.join("、")}</Alert>}
        </CardContent></Card>
      </Box>
    </Box>

    <Dialog open={assignmentOpen} onClose={() => setAssignmentOpen(false)} fullWidth maxWidth="xs"><DialogTitle>補入清潔人員</DialogTitle><DialogContent dividers><Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>選擇一位人員補足這個場次的缺額。</Typography><FormControl fullWidth><InputLabel id="cleaner-label">清潔人員</InputLabel><Select labelId="cleaner-label" label="清潔人員" value={assignedCleaner} onChange={(event) => setAssignedCleaner(event.target.value)}>{availableCleaners.map((cleaner) => <MenuItem key={cleaner} value={cleaner}>{cleaner}</MenuItem>)}</Select></FormControl></DialogContent><DialogActions sx={{ p: 2 }}><Button onClick={() => setAssignmentOpen(false)}>取消</Button><Button variant="contained" startIcon={<AddIcon />} disabled={!assignedCleaner} onClick={() => setAssignmentOpen(false)}>確認補人</Button></DialogActions></Dialog>
  </Box>;
}
