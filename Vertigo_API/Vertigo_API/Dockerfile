FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["DropDown_API/DropDown_API.csproj", "DropDown_API/"]
RUN dotnet restore "DropDown_API/DropDown_API.csproj"
COPY . .
WORKDIR "/src/DropDown_API"
RUN dotnet build "DropDown_API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "DropDown_API.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "DropDown_API.dll"]
