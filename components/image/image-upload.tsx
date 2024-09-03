'use client'

import { FileWithPath } from "@mantine/dropzone";
import useSWRMutation from "swr/mutation";
import { Group, Text, rem } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import '@mantine/core/styles.css';

async function uploadDocuments(
    url: string,
    { arg }: { arg: { files: FileWithPath[] } }
  ): Promise<Object[]> {
    const body = new FormData();
    arg.files.forEach((file) => {
      body.append("file", file, file.name);
    });

    const response = await fetch(url, { method: "POST", body });
    return await response.json();
}

  
export default function ImageUpload(){
    
    const { trigger } = useSWRMutation("/api/s3-upload", uploadDocuments);

    return (
        <div className="mt-20 ">
            <Dropzone
            // onDrop={(files) => console.log('accepted files', files)}
            onDrop={(files) => trigger({ files })}
            onReject={(files) => console.log('rejected files', files)}
            maxSize={5 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
            className="border px-2 cursor-pointer hover:bg-slate-100"
   
            >
            <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
                <Dropzone.Accept>
                <IconUpload
                    style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
                    stroke={1.5}
                />
                </Dropzone.Accept>
                <Dropzone.Reject>
                <IconX
                    style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
                    stroke={1.5}
                />
                </Dropzone.Reject>
                <Dropzone.Idle>
                <IconPhoto
                    style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
                    stroke={1.5}
                />
                </Dropzone.Idle>

                <div>
                <Text size="xl" inline>
                    Drag images here or click to select files
                </Text>
                <Text size="sm" c="dimmed" inline mt={7}>
                    Attach as many files as you like, each file should not exceed 5mb
                </Text>
                </div>
            </Group>
            </Dropzone>
      
        </div>
    )
}