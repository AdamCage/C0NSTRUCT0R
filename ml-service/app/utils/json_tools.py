import json
from typing import Any, Dict

def coerce_json(s: str) -> Dict[str, Any]:
    """Try to parse a JSON string, trimming code fences if present."""
    s = s.strip()
    if s.startswith("```"):
        # strip possible fences
        s = s.strip("`\n")
        # remove optional 'json' hint
        if s.startswith("json\n"):
            s = s[5:]
    return json.loads(s)
