export interface PreviewLayout {
  left: number;
  top: number;
  width: number;
  height: number;
  lineStart: { x: number; y: number };
  lineEnd: { x: number; y: number };
}

/** Largeur max miniature (550 px × 150 % = 825 px) */
const PREVIEW_MAX_WIDTH = 825;
const VIEWPORT_PADDING = 16;

/** 8 directions : cardinaux + diagonales (vecteurs unitaires) */
const DIRECTIONS = [
  { dx: 0, dy: -1 },
  { dx: 0, dy: 1 },
  { dx: -1, dy: 0 },
  { dx: 1, dy: 0 },
  { dx: -0.707106, dy: -0.707106 },
  { dx: 0.707106, dy: -0.707106 },
  { dx: -0.707106, dy: 0.707106 },
  { dx: 0.707106, dy: 0.707106 },
] as const;

function getPreviewSize() {
  const width = Math.min(window.innerWidth * 0.92, PREVIEW_MAX_WIDTH);
  const height = width * (10 / 16) + 84;
  return { width, height };
}

function getConnectorLength() {
  return Math.min(Math.max(window.innerHeight * 0.11, 88), 140);
}

function boxExtent(halfW: number, halfH: number, dx: number, dy: number) {
  return halfW * Math.abs(dx) + halfH * Math.abs(dy);
}

function directionBias(cx: number, cy: number, dx: number, dy: number) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  let bias = 0;

  if (cy < vh * 0.38 && dy > 0) bias += 120;
  if (cy > vh * 0.62 && dy < 0) bias += 120;
  if (cx < vw * 0.38 && dx > 0) bias += 120;
  if (cx > vw * 0.62 && dx < 0) bias += 120;

  return bias;
}

/**
 * Choisit la meilleure direction (haut, bas, diagonale…) pour garder la miniature dans le viewport.
 */
export function computePreviewLayout(anchorRect: DOMRect): PreviewLayout {
  const { width: previewW, height: previewH } = getPreviewSize();
  const connectorLen = getConnectorLength();
  const cx = anchorRect.left + anchorRect.width / 2;
  const cy = anchorRect.top + anchorRect.height / 2;
  const pointR = anchorRect.width / 2;
  const halfW = previewW / 2;
  const halfH = previewH / 2;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const pad = VIEWPORT_PADDING;

  let best: PreviewLayout | null = null;
  let bestScore = -Infinity;

  for (const { dx, dy } of DIRECTIONS) {
    const endX = cx + dx * (pointR + connectorLen);
    const endY = cy + dy * (pointR + connectorLen);
    const ext = boxExtent(halfW, halfH, dx, dy);
    const centerX = endX + dx * ext;
    const centerY = endY + dy * ext;

    let left = centerX - halfW;
    let top = centerY - halfH;

    left = Math.max(pad, Math.min(left, vw - previewW - pad));
    top = Math.max(pad, Math.min(top, vh - previewH - pad));

    const visibleW =
      Math.min(left + previewW, vw - pad) - Math.max(left, pad);
    const visibleH =
      Math.min(top + previewH, vh - pad) - Math.max(top, pad);
    const visibleArea = Math.max(0, visibleW) * Math.max(0, visibleH);
    const fullFit =
      left >= pad &&
      top >= pad &&
      left + previewW <= vw - pad &&
      top + previewH <= vh - pad;

    const score =
      (fullFit ? 100_000 : 0) +
      visibleArea +
      directionBias(cx, cy, dx, dy);

    if (score > bestScore) {
      const clampedCenterX = left + halfW;
      const clampedCenterY = top + halfH;
      const toPreviewDx = clampedCenterX - cx;
      const toPreviewDy = clampedCenterY - cy;
      const dist = Math.hypot(toPreviewDx, toPreviewDy) || 1;
      const ndx = toPreviewDx / dist;
      const ndy = toPreviewDy / dist;
      const lineEndExt = boxExtent(halfW, halfH, ndx, ndy);

      bestScore = score;
      best = {
        left,
        top,
        width: previewW,
        height: previewH,
        lineStart: { x: cx + ndx * pointR, y: cy + ndy * pointR },
        lineEnd: {
          x: clampedCenterX - ndx * lineEndExt,
          y: clampedCenterY - ndy * lineEndExt,
        },
      };
    }
  }

  return best!;
}
