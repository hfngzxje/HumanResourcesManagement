using HumanResourcesManagement.DTOS.Request;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Newtonsoft.Json;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace HumanResourcesManagement.Config.Converter
{
    public class HoSoLuongRequestConverter : ValueConverter<HoSoLuongRequest, string>
    {
        public HoSoLuongRequestConverter() : base(
            v => JsonConvert.SerializeObject(v),
            v => JsonConvert.DeserializeObject<HoSoLuongRequest>(v))
        {
        }
    }
}
