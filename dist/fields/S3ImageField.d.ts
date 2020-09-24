import React from 'react';
export interface S3ImageFieldProps {
    record?: Record<string, any>;
    source?: string;
    imgProps?: any;
    addLabel?: boolean;
}
export declare const S3ImageField: React.FC<S3ImageFieldProps>;
