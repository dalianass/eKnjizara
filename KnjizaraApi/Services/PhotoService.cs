using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using KnjizaraApi.Helpers;
using KnjizaraApi.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KnjizaraApi.Services
{
    public class PhotoService : IPhotoService
    {
        private readonly Cloudinary _cloudinary;
        public PhotoService(IOptions<CloudinarySettings> config)
        {
            var acc = new Account("daq9ulbte", "789544995539378", "32YgHVE1wUqrLuZ_RrMet5Hp1LE");
            //    config.Value.CloudName,
            //    config.Value.ApiKey,
            //    config.Value.ApiSecret
            //);
            _cloudinary = new Cloudinary(acc);

        }

        public async Task<ImageUploadResult> AddPhotoAsync(IFormFile file)
        {
            var uploadResult = new ImageUploadResult();
            if (file.Length > 0)
            {
                using var stream = file.OpenReadStream();
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(file.FileName, stream),
                    Transformation = new Transformation().Height(500).Width(500).Crop("fill")
                    //Transformation = new Transformation().Height(500).Width(500).Crop("fill").Gravity("face")
                };
                //upload slike na Cloudinary ->
                uploadResult = await _cloudinary.UploadAsync(uploadParams);
            }
            return uploadResult;
        }

        //public async Task<DeletionResult> DeletePhotoAsync(string publicId)
        //{
        //    var deleteParams = new DeletionParams(publicId);
        //    var result = await _cloudinary.DestroyAsync(deleteParams);
        //    return result;
        //}
    }
}
