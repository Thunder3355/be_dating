# Используем базовый образ ASP.NET для запуска
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

# Используем образ SDK для сборки
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Копируем файл проекта и выполняем restore
COPY ["./API.csproj", "API/"]
RUN dotnet restore "API/API.csproj"

# Копируем весь проект и выполняем сборку
COPY . .
WORKDIR "/src/API"
RUN dotnet build -c Release -o /app/build

# Публикуем проект
FROM build AS publish
RUN dotnet publish -c Release -o /app/publish

# Создаём финальный контейнер для запуска
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "API.dll"]
