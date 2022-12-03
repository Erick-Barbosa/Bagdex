using Microsoft.AspNetCore.Mvc;
using Bagdex.Data;
using Bagdex.Models;

namespace Bagdex.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BagdexController : ControllerBase
    {
        private readonly BagdexContext? _context;

        public BagdexController(BagdexContext? context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<List<Bagmon>>? getAll() {
            if (_context?.Bagmon != null)
                return _context.Bagmon.ToList();

            else return NoContent();
        }

        [HttpGet]
        [Route("bagmon")]
        public ActionResult<dynamic> login(int id)
        {
            //verifica se existe aluno a ser excluído
            var bagmon = _context.Bagmon
                .Where(b => b.id == id)
                .FirstOrDefault();
            if (bagmon == null)
                return NotFound("Bagmon não encontrado");
            
            return bagmon;
        }

        [HttpPost]
        public async Task<ActionResult> post(Bagmon model) {
            try {
                _context.Bagmon.Add(model);
                if (await _context.SaveChangesAsync() == 1)
                    return Created($"/api/Bagmon/{model}", model);
            } catch (Exception e){
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados");
            }
            return BadRequest();
        }

        [HttpPut("{BagmonId}")]
        public async Task<ActionResult> put(int BagmonId, Bagmon dadosBagmonAlt) {
            try {
                var result = await _context.Bagmon.FindAsync(BagmonId);
                if (BagmonId != result.id) {
                    return BadRequest();
                }
                
                await _context.SaveChangesAsync();
                
                return Created($"/api/Bagmon/{dadosBagmonAlt}", dadosBagmonAlt);
            } catch {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados");
            }
        }

        [HttpDelete("{BagmonId}")]
        public async Task<ActionResult> delete(int BagmonId) {
            try {
                var Bagmon = await _context.Bagmon.FindAsync(BagmonId);
                if (Bagmon == null) {
                    return NotFound();
                }
                _context.Remove(Bagmon);
                await _context.SaveChangesAsync();
                return NoContent();
            } catch {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados");
            }
        }
    }
}