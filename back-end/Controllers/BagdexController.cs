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

        public BagdexController(BagdexContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<List<Bagmon>>? getAll() {
            if (_context?.Bagmon != null)
                return _context.Bagmon.ToList();

            else return null;
        }

        [HttpGet("{BagmonId}")]
        public ActionResult<List<Bagmon>> get(int bagmonId) {
            try {
                var result = _context.Bagmon.Find(bagmonId);
                if (result == null)
                {
                    return NotFound();
                }
                return Ok(result);
            } catch (Exception e) {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados");
            }
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
                
                //result.ra = dadosBagmonAlt.ra;
                //result.nome = dadosBagmonAlt.nome;
                //result.codCurso = dadosBagmonAlt.codCurso;
                
                await _context.SaveChangesAsync();
                
                return Created($"/api/Bagmon/{dadosBagmonAlt}", dadosBagmonAlt);
            } catch (Exception e){
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
            } catch (Exception e){
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha no acesso ao banco de dados");
            }
        }
    }
}