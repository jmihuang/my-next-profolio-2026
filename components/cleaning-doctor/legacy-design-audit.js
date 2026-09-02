import { Box, Card, CardContent, Chip, Divider, Paper, Stack, Typography } from "@mui/material";

const problems = [
  ["篩選條件沒有任務結構", "人員、地區、薪資區間與日期同列堆放；營運人員無法一眼知道要先找人、找班，還是查報酬。"],
  ["按鈕同色、同權重、位置分散", "查看、修改、查詢與匯出 Excel 沒有主次；大量橘色「修改」按鈕讓操作像逐筆修資料，無法支援排班決策。"],
  ["替補關鍵資訊藏在詳細頁", "列表只顯示人名、報酬與地區；可服務時段、現有班表、衝突與適配條件需要逐筆點開確認。"],
  ["報酬資料缺少可掃讀層級", "一筆班次中的人員、時間、地址、服務與薪資混在同一平面；主管難以比對異動後的工時與總額。"],
];

const improvements = [
  ["任務導向篩選", "先選擇缺班訂單，再以時段、區域與服務條件篩選；將不常用的報酬條件收進次要篩選。"],
  ["候選人比較與排序", "以 DataGrid 同時呈現可服務時段、區域、匹配度、衝突原因與替補判斷，取代逐筆進詳細頁。"],
  ["清楚操作階層", "「確認替補並通知」是唯一主要行動；查看、修改、匯出改為次要操作，刪除與異常操作清楚區隔。"],
  ["集中異動與可追溯回饋", "透過 Dialog 集中調整工時／報酬，儲存後以狀態提示與異動紀錄回饋，避免分散的逐欄修改。"],
];

export default function LegacyDesignAudit() {
  return <Box component="section" sx={{ py: { xs: 7, md: 12 }, borderTop: "1px solid", borderColor: "divider" }}>
    <Typography variant="overline" color="primary.main" sx={{ letterSpacing: 2 }}>02 · LEGACY DESIGN AUDIT</Typography>
    <Typography component="h2" sx={{ mt: 1, fontSize: { xs: 32, md: 52 }, letterSpacing: "-.045em", fontWeight: 300 }}>From a data screen to a scheduling tool.</Typography>
    <Typography sx={{ mt: 3, maxWidth: 800, color: "text.secondary", lineHeight: 1.9 }}>紅色標記為舊有設計的問題盤點。平台偏向「資料查詢與逐筆修改」，沒有支援清潔人員請假、換班與臨時補人的核心任務；因此即使資料都在平台中，排班仍需回到人工逐一確認。</Typography>
    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "repeat(2, 1fr)" }, gap: 3, mt: 5 }}>
      <Card variant="outlined" sx={{ borderRadius: 3, overflow: "hidden" }}><Box component="img" src="/projects/cleaning-doctor/original-design/payroll-list.png" alt="舊版兼職報酬管理列表與問題標記" sx={{ display: "block", width: "100%" }} /><CardContent><Typography variant="h6">舊設計：列表與查詢</Typography><Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>篩選、查看、匯出與資料列操作同時競爭注意力。</Typography></CardContent></Card>
      <Card variant="outlined" sx={{ borderRadius: 3, overflow: "hidden" }}><Box component="img" src="/projects/cleaning-doctor/original-design/payroll-detail.png" alt="舊版兼職報酬詳細頁與問題標記" sx={{ display: "block", width: "100%" }} /><CardContent><Typography variant="h6">舊設計：班次與報酬詳細</Typography><Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>資訊分散於重複區塊，必須逐欄修改與人工比對。</Typography></CardContent></Card>
    </Box>
    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" }, gap: 4, mt: 6 }}>
      <Box><Typography variant="overline" color="text.secondary">舊設計的問題</Typography><Stack spacing={2} sx={{ mt: 2 }}>{problems.map(([title, text], index) => <Paper key={title} variant="outlined" sx={{ p: 2.5, borderRadius: 2 }}><Stack direction="row" spacing={1.5} alignItems="center"><Chip size="small" color="error" label={`0${index + 1}`} /><Typography variant="h6">{title}</Typography></Stack><Typography sx={{ mt: 1.5, color: "text.secondary", lineHeight: 1.75 }}>{text}</Typography></Paper>)}</Stack></Box>
      <Box><Typography variant="overline" color="primary.main">我做的優化</Typography><Stack spacing={2} sx={{ mt: 2 }}>{improvements.map(([title, text], index) => <Paper key={title} variant="outlined" sx={{ p: 2.5, borderRadius: 2, borderColor: "primary.light" }}><Stack direction="row" spacing={1.5} alignItems="center"><Chip size="small" color="primary" label={`0${index + 1}`} /><Typography variant="h6">{title}</Typography></Stack><Typography sx={{ mt: 1.5, color: "text.secondary", lineHeight: 1.75 }}>{text}</Typography></Paper>)}</Stack></Box>
    </Box>
    <Divider sx={{ my: 6 }} />
    <Typography sx={{ maxWidth: 800, lineHeight: 1.9 }}>成果不是單純更新元件外觀，而是把排班工作從「查資料、打電話、逐筆修改」轉成「找出缺口、比較候選人、確認替補並通知」的可追溯流程。</Typography>
  </Box>;
}
