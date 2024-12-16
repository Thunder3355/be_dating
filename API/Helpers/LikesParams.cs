using System;

namespace API.Helpers;

public class LikesParams : PagenationParams
{
    public int UserId { get; set; }
    public required string Predicate { get; set; } = "liked";
}
