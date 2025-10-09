# Gemini Home Improvements - Image Organization Script
# Run this from the NewGHI directory

Write-Host "🖼️  Organizing Your Business Photos..." -ForegroundColor Cyan
Write-Host ""

# Create organized directory structure
Write-Host "Creating directory structure..." -ForegroundColor Yellow
New-Item -ItemType Directory -Force -Path "public\images\carousel" | Out-Null
New-Item -ItemType Directory -Force -Path "public\images\projects" | Out-Null
New-Item -ItemType Directory -Force -Path "public\images\services" | Out-Null
Write-Host "✓ Directories created" -ForegroundColor Green
Write-Host ""

# Copy carousel images (your best work for homepage)
Write-Host "Copying carousel images (homepage hero)..." -ForegroundColor Yellow
if (Test-Path "public\old_images\carousel\image_01_mine.jpg") {
    Copy-Item "public\old_images\carousel\image_01_mine.jpg" "public\images\carousel\slide1.jpg" -Force
    Write-Host "✓ Slide 1 copied" -ForegroundColor Green
}
if (Test-Path "public\old_images\carousel\image_02_mine.jpg") {
    Copy-Item "public\old_images\carousel\image_02_mine.jpg" "public\images\carousel\slide2.jpg" -Force
    Write-Host "✓ Slide 2 copied" -ForegroundColor Green
}
if (Test-Path "public\old_images\carousel\image_03_mine.jpg") {
    Copy-Item "public\old_images\carousel\image_03_mine.jpg" "public\images\carousel\slide3.jpg" -Force
    Write-Host "✓ Slide 3 copied" -ForegroundColor Green
}
Write-Host ""

# Copy project photos with descriptive names
Write-Host "Copying project photos..." -ForegroundColor Yellow
if (Test-Path "public\old_images\20190526_124305.jpg") {
    Copy-Item "public\old_images\20190526_124305.jpg" "public\images\projects\exterior-renovation-2019-1.jpg" -Force
    Write-Host "✓ 2019 Exterior Renovation (Photo 1)" -ForegroundColor Green
}
if (Test-Path "public\old_images\20190526_124310.jpg") {
    Copy-Item "public\old_images\20190526_124310.jpg" "public\images\projects\exterior-renovation-2019-2.jpg" -Force
    Write-Host "✓ 2019 Exterior Renovation (Photo 2)" -ForegroundColor Green
}
if (Test-Path "public\old_images\20190526_124326.jpg") {
    Copy-Item "public\old_images\20190526_124326.jpg" "public\images\projects\exterior-renovation-2019-3.jpg" -Force
    Write-Host "✓ 2019 Exterior Renovation (Photo 3)" -ForegroundColor Green
}
if (Test-Path "public\old_images\20190526_124333.jpg") {
    Copy-Item "public\old_images\20190526_124333.jpg" "public\images\projects\exterior-renovation-2019-4.jpg" -Force
    Write-Host "✓ 2019 Exterior Renovation (Photo 4)" -ForegroundColor Green
}
if (Test-Path "public\old_images\20220227_144919.jpg") {
    Copy-Item "public\old_images\20220227_144919.jpg" "public\images\projects\eavestrough-installation-2022.jpg" -Force
    Write-Host "✓ 2022 Eavestrough Installation" -ForegroundColor Green
}
if (Test-Path "public\old_images\20220319_111221.jpg") {
    Copy-Item "public\old_images\20220319_111221.jpg" "public\images\projects\gutter-system-2022-1.jpg" -Force
    Write-Host "✓ 2022 Gutter System (Photo 1)" -ForegroundColor Green
}
if (Test-Path "public\old_images\20220319_111233.jpg") {
    Copy-Item "public\old_images\20220319_111233.jpg" "public\images\projects\gutter-system-2022-2.jpg" -Force
    Write-Host "✓ 2022 Gutter System (Photo 2)" -ForegroundColor Green
}
if (Test-Path "public\old_images\20220611_175651.jpg") {
    Copy-Item "public\old_images\20220611_175651.jpg" "public\images\projects\fascia-repair-2022.jpg" -Force
    Write-Host "✓ 2022 Fascia Repair" -ForegroundColor Green
}
if (Test-Path "public\old_images\20230908_103028.jpg") {
    Copy-Item "public\old_images\20230908_103028.jpg" "public\images\projects\complete-renovation-2023.jpg" -Force
    Write-Host "✓ 2023 Complete Renovation" -ForegroundColor Green
}
Write-Host ""

# Copy some photos to services folder
Write-Host "Copying service showcase images..." -ForegroundColor Yellow
if (Test-Path "public\old_images\20220227_144919.jpg") {
    Copy-Item "public\old_images\20220227_144919.jpg" "public\images\services\eavestrough-service.jpg" -Force
    Write-Host "✓ Eavestrough service image" -ForegroundColor Green
}
if (Test-Path "public\old_images\20190526_124310.jpg") {
    Copy-Item "public\old_images\20190526_124310.jpg" "public\images\services\siding-service.jpg" -Force
    Write-Host "✓ Siding service image" -ForegroundColor Green
}
if (Test-Path "public\old_images\20220319_111221.jpg") {
    Copy-Item "public\old_images\20220319_111221.jpg" "public\images\services\gutter-protection-service.jpg" -Force
    Write-Host "✓ Gutter protection service image" -ForegroundColor Green
}
Write-Host ""

Write-Host "🎉 Image organization complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📂 Your images are now organized in:" -ForegroundColor Cyan
Write-Host "   • public\images\carousel\    (3 slides for homepage)" -ForegroundColor White
Write-Host "   • public\images\projects\    (10 project photos)" -ForegroundColor White
Write-Host "   • public\images\services\    (3 service images)" -ForegroundColor White
Write-Host ""
Write-Host "⚠️  Note: Your original images are still safe in public\old_images\" -ForegroundColor Yellow
Write-Host ""
Write-Host "✅ Next steps:" -ForegroundColor Cyan
Write-Host "   1. Run 'npm run dev' to start the server" -ForegroundColor White
Write-Host "   2. Check IMAGE_GUIDE.md for how to use these in your pages" -ForegroundColor White
Write-Host "   3. Update pages to reference /images/ instead of placeholders" -ForegroundColor White
Write-Host ""
