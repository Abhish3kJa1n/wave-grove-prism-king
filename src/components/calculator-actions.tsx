import { Share2, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { shareOrCopy } from "@/lib/share";

export function CalculatorActions({
  onReset,
  shareTitle,
  shareText,
  getShareUrl,
}: {
  onReset: () => void;
  shareTitle: string;
  shareText: string;
  getShareUrl: () => string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        type="button"
        variant="outline"
        onClick={async () => {
          const result = await shareOrCopy({
            title: shareTitle,
            text: shareText,
            url: getShareUrl(),
          });
          if (result === "copied") toast.success("Results copied to clipboard");
          if (result === "shared") toast.success("Results shared");
        }}
      >
        <Share2 />
        Share results
      </Button>
      <Button type="button" variant="ghost" onClick={onReset}>
        <RotateCcw />
        Reset
      </Button>
    </div>
  );
}
