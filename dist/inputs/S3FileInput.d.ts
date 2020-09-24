import React from 'react';
interface S3InputProps {
    source: string;
    dropzoneOptions?: any;
    label?: string;
    level?: 'public' | 'protected' | 'private' | undefined;
}
export declare const S3FileInput: React.FC<S3InputProps>;
export {};
