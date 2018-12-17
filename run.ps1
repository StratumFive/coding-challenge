Set-Location tests/SurveyShips.Tests
dotnet build
dotnet test

Set-Location ../../src/SurveyShips.App
dotnet build
dotnet run

Set-Location ../../