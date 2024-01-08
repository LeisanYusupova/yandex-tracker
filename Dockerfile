FROM --platform=linux/amd64 node:20.9.0-slim as build_front
COPY frontend/package.json package.json
COPY frontend/package-lock.json package-lock.json
RUN npm ci
COPY frontend/ .
RUN npm run build

FROM mcr.microsoft.com/dotnet/sdk:8.0 as build_back
WORKDIR /src
COPY backend/backend.sln backend.sln
COPY backend/backend.csproj backend.csproj
RUN dotnet restore
COPY backend/ .
RUN dotnet publish -c Release -o /publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0
EXPOSE 80
ENV ASPNETCORE_URLS=http://+:80
WORKDIR /app
COPY --from=build_back /publish .
COPY --from=build_front /build ./wwwroot
ENTRYPOINT ["dotnet", "backend.dll"]
