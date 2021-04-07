using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MS.Paint2.Repository;
using System.Collections.Generic;
using System.Drawing.Imaging;
using System.Linq;

namespace MS.Paint2.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SketchController : ControllerBase
    {
        private readonly ILogger<SketchController> _logger;
        private readonly SketchRepository _sketchRepository;

        public SketchController(ILogger<SketchController> logger, SketchRepository sketchRepository)
        {
            _logger = logger;
            _sketchRepository = sketchRepository;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Sketch>> Get()
        {
            var sketches = _sketchRepository.ReadAll();
            return sketches.Select(x => SketchAssembler.Map(x)).ToArray();
        }

        [HttpGet("{id}")]
        public ActionResult<Sketch> Get(string id)
        {
            var modelSketch = _sketchRepository.Read(id);
            return SketchAssembler.Map(modelSketch);
        }

        [HttpPost]
        public void Post(Sketch sketch)
        {
            _logger.LogInformation($"Save image: {sketch.Name}");

            var imageDataAsBase64 = sketch.ImageData.Remove(0, 22);
            var imageData = System.Convert.FromBase64String(imageDataAsBase64);

            var sketchModel = new SketchModel
            {
                Name = sketch.Name,
                ImageData = imageData
            };

            _sketchRepository.Create(sketchModel);
            //using (var memoryStream = new System.IO.MemoryStream(imageData))
            //{
            //    var image = System.Drawing.Image.FromStream(memoryStream);
            //    image.Save("temp.png", ImageFormat.Png);
            //    image.Dispose();
            //}
        }
    }
}
