import React from 'react';
interface S3ImageFieldProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    source?: string;
    record?: Record<string, any>;
    label?: string;
    imgProps?: any;
    addLabel?: boolean;
}
export declare const S3Field: React.FC<S3ImageFieldProps>;
export {};
