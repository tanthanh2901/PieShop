FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["FoodShop.API/FoodShop.API.csproj", "FoodShop.API/"]
COPY ["FoodShop.Application/FoodShop.Application.csproj", "FoodShop.Application/"]
COPY ["FoodShop.Domain/FoodShop.Domain.csproj", "FoodShop.Domain/"]
COPY ["FoodShop.Persistence/FoodShop.Persistence.csproj", "FoodShop.Persistence/"]
COPY ["FoodShop.Infrastructure/FoodShop.Infrastructure.csproj", "FoodShop.Infrastructure/"]
# Restore dependencies
RUN dotnet restore "FoodShop.API/FoodShop.API.csproj"

# Copy the source code  
COPY ["FoodShop.API/", "FoodShop.API/"]
COPY ["FoodShop.Application/", "FoodShop.Application/"]
COPY ["FoodShop.Domain/", "FoodShop.Domain/"]
COPY ["FoodShop.Persistence/", "FoodShop.Persistence/"]
COPY ["FoodShop.Infrastructure/", "FoodShop.Infrastructure/"]

# Build the application
WORKDIR "/src/FoodShop.API"
RUN dotnet build -c Release -o /app/build
# Publish the application
FROM build AS publish
RUN dotnet publish -c Release -o /app/publish
# Build the runtime image
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

ENTRYPOINT ["dotnet", "FoodShop.API.dll"]
