using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Bagdex.Data;
using Bagdex.Models;

namespace Bagdex.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BagdexUserController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly BagdexContext? _context;

        public BagdexUserController(IConfiguration configuration, BagdexContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        [HttpPost("{auth}")]
        public ActionResult<BagdexUser> get()
        {
            try
            {
                var result = _context.BagdexUser.Find();
                if (result == null)
                {
                    return NotFound();
                }
                return Ok(result);
            }
            catch
            {
                return this.StatusCode(
                    StatusCodes.Status500InternalServerError,
                    "Falha no acesso ao banco de dados"
                );
            }
        }

        [HttpPost]
        [Route("login")]
        [AllowAnonymous]
        public ActionResult<dynamic> Login([FromBody] BagdexUser usuario)
        {
            //verifica se existe aluno a ser excluído
            var user = _context.BagdexUser
                .Where(u => u.username == usuario.username && u.password == usuario.password)
                .FirstOrDefault();
            if (user == null)
                return Unauthorized("Usuário ou senha inválidos");
            var authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.username),
                new Claim(ClaimTypes.Role, user.role),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };
            var token = GetToken(authClaims);
            user.password = "";
            return Ok(new { token = new JwtSecurityTokenHandler().WriteToken(token), user = user });
        }

        private JwtSecurityToken GetToken(List<Claim> authClaims)
        {
            var authSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_configuration["JWT:Secret"])
            );

            var token = new JwtSecurityToken(
                expires: DateTime.Now.AddHours(3),
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                claims: authClaims,
                signingCredentials: new SigningCredentials(
                    authSigningKey,
                    SecurityAlgorithms.HmacSha256
                )
            );
            return token;
        }
    }
}
