﻿using FoodShop.Application.Contract.Persistence;
using FoodShop.Application.Feature.Account.Login;
using FoodShop.Application.Feature.Account.Models;
using FoodShop.Application.Feature.Account.Register;
using MediatR;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using FoodShop.API.Services;
using Microsoft.AspNetCore.Identity;
using FoodShop.Domain.Entities;
using FoodShop.Application.Contract.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace FoodShop.API.Controllers
{
    [Route("authentication")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IMediator mediatR;
        private readonly IJwtProvider jwtProvider;
        private readonly UserManager<AppUser> _userManager;
        private readonly IAuthenRepository userRepository;
        private readonly AuthenticationServices authenticationService;

        public AuthenticationController(IMediator mediatR, IAuthenRepository userRepository, AuthenticationServices authenticationService, UserManager<AppUser> userManager, IJwtProvider jwtProvider)
        {
            this.mediatR = mediatR;
            this.userRepository = userRepository;
            this.authenticationService = authenticationService;
            _userManager = userManager;
            this.jwtProvider = jwtProvider;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(
            LoginModel loginModel)
        {
            if (ModelState.IsValid)
            {
                var tokenDto = await mediatR.Send(new LoginCommand(loginModel));
                authenticationService.SetTokenCookie(tokenDto, HttpContext);

                return Ok();
              
            }

            return BadRequest("Invalid model state.");
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterModel registerModel)
        {
            if (ModelState.IsValid)
            {
                var loginResponse = await mediatR.Send(new RegisterCommand(registerModel));
                return Ok(loginResponse);

            }

            return BadRequest("Invalid model state.");
        }

        [HttpPost("logout")]
        [Authorize] // Ensure only authenticated users can logout
        public async Task<IActionResult> Logout()
        {
            // Sign out the user
            await userRepository.Logout();

            // Clear the authentication cookie
            Response.Cookies.Delete("accessToken");
            return Ok(new { message = "Logged out successfully" });
        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken()
        {
            var refreshToken = Request.Cookies["refreshToken"];

            if (string.IsNullOrEmpty(refreshToken))
            {
                return Unauthorized("Refresh token not found.");
            }

            // Validate the refresh token
            var user = await _userManager.Users.SingleOrDefaultAsync(u => u.RefreshToken == refreshToken);

            if (user == null || user.RefreshTokenExpiryTime <= DateTime.Now)
            {
                return Unauthorized("Invalid or expired refresh token.");
            }

            // Generate new access and refresh tokens
            var newTokens = await jwtProvider.Generate(user);

            // Set the new tokens in cookies
            authenticationService.SetTokenCookie(newTokens, HttpContext);

            return Ok(newTokens);
        }


    }




}