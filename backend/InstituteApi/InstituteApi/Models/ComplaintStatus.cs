using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace InstituteApi.Models
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum ComplaintStatus
    {
        [EnumMember(Value = "ACTIVE")]
        ACTIVE,

        [EnumMember(Value = "RESOLVED")]
        RESOLVED
    }
}
