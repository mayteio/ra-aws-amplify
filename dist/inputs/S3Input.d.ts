import React from 'react';
interface S3InputProps {
    source: string;
    dropzoneOptions?: any;
    multiple?: boolean;
    level?: 'public' | 'protected' | 'private' | undefined;
}
export declare const S3Input: React.FC<S3InputProps>;
export {};
