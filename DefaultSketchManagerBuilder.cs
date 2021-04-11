using Microsoft.Extensions.Logging;
using MS.Paint2.Repository;

namespace MS.Paint2
{
    public class DefaultSketchManagerBuilder
    {
        private readonly ILogger<DefaultSketchManagerBuilder> _logger;
        private readonly SketchRepository _sketchRepository;

        public DefaultSketchManagerBuilder(ILogger<DefaultSketchManagerBuilder> logger, SketchRepository sketchRepository)
        {
            _logger = logger;
            _sketchRepository = sketchRepository;
        }

        public void Build()
        {
            _logger.LogInformation("Checking if any sketches exist");
            var sketches = _sketchRepository.ReadAll();
            _logger.LogInformation($"Found {sketches.Count} sketches");

            if (sketches.Count  == 0)
            {
                var files = System.IO.Directory.GetFiles("Sketches");
                _logger.LogInformation($"Found {sketches.Count} default sketches");
                foreach (var file in files)
                {
                    var imageData = System.IO.File.ReadAllBytes(file);

                    var sketchModel = new SketchModel
                    {
                        Name = file,
                        ImageData = imageData,
                        DateCreated = System.DateTime.UtcNow
                    };

                    _sketchRepository.Create(sketchModel);
                    _logger.LogInformation($"Created sketch {file}");
                }
            }
        }
    }
}
