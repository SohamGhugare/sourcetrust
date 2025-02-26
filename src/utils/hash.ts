import { createHash } from 'crypto';

export function hashMetadata(data: any): `0x${string}` {
  const hash = createHash('sha256')
    .update(JSON.stringify(data))
    .digest('hex');
  return `0x${hash}` as `0x${string}`;
} 