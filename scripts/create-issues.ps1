# ============================================================
# VCET GitHub Issues Bulk Creator
# Authentication is handled automatically from stored git credentials
# ============================================================

$env:PATH  += ";C:\Program Files\GitHub CLI"
$env:GH_TOKEN = (("protocol=https`nhost=github.com`n" | git credential fill) |
    Select-String "^password=") -replace "password=",""

$REPO    = "CyberCodezilla/vcet.edu.in"
$GH      = "C:\Program Files\GitHub CLI\gh.exe"
$ISSUES  = Join-Path $PSScriptRoot "issues"

$titles = @{
    "01-about.md"               = "[Redesign] About VCET - pages/about/ (Group 1)"
    "02-admissions.md"          = "[Redesign] Admissions - pages/admissions/ (Group 2)"
    "03-departments-cs-it.md"   = "[Redesign] Departments Group A CS/IT - pages/departments/ (Group 3)"
    "04-departments-core.md"    = "[Redesign] Departments Group B Core - pages/departments/ (Group 4)"
    "05-academics.md"           = "[Redesign] Academics - pages/academics/ (Group 5)"
    "06-research.md"            = "[Redesign] Research - pages/research/ (Group 6)"
    "07-facilities.md"          = "[Redesign] Facilities - pages/facilities/ (Group 7)"
    "08-student-life.md"        = "[Redesign] Student Life - pages/student-life/ (Group 8)"
    "09-clubs.md"               = "[Redesign] Technical Clubs - pages/clubs/ (Group 9)"
    "10-committees.md"          = "[Redesign] Committees - pages/committees/ (Group 10)"
    "11-naac.md"                = "[Redesign] NAAC - pages/naac/ (Group 11)"
    "12-contact.md"             = "[Redesign] Contact Us - pages/contact/ (Group 12)"
}

# Create label
Write-Host "Creating redesign label..." -ForegroundColor Yellow
& $GH label create redesign --repo $REPO --description "Page redesign and refactor task" --color "0075ca" 2>&1 | Out-Null

# Create issues
foreach ($file in $titles.Keys | Sort-Object) {
    $bodyFile = Join-Path $ISSUES $file
    $title    = $titles[$file]
    Write-Host "Creating: $title" -ForegroundColor Cyan
    & $GH issue create --repo $REPO --title $title --body-file $bodyFile --label "redesign"
}

Write-Host "`nAll 12 issues created." -ForegroundColor Green
