import {Readable} from 'stream';
import config from '@config';
import {createWriteStream} from 'fs';

export const onLocalFS = (
  stream: Readable,
  filename: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const writableStream = createWriteStream(
      `${config.common.path.uploads}/${filename}`
    );
    writableStream.on('close', resolve).on('error', reject);
    stream.pipe(writableStream);
  });
};
