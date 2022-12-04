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

        [HttpPut]
        [Route("changeUserRole")]
        [Authorize(Roles = "Administrador")]
        public async Task<ActionResult> put(int userId, BagdexUser changedUserData) {
            try {
                var result = await _context.BagdexUser.FindAsync(userId);
                if (userId != result.id) {
                    return BadRequest();
                }
                result.role = changedUserData.role;
                
                await _context.SaveChangesAsync();

                changedUserData.password = "";
                
                return Created($"/api/user/{changedUserData}", changedUserData);
            } catch {
                return this.StatusCode(
                    StatusCodes.Status500InternalServerError,
                     "Falha no acesso ao banco de dados"
                );
            }
        }

        [HttpGet]
        [Route("userList")]
        [Authorize(Roles = "Administrador")]
        public ActionResult<List<BagdexUser>>? getAll() {
            if (_context?.BagdexUser != null)
                return _context.BagdexUser.ToList();

            else return Unauthorized("Não autorizado");
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
