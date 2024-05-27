import { UploadApiResult } from './model/uploadModel';
import { defHttp } from '@project/utils/http/axios';
import { UploadFileParams } from '@projectType/axios';
import { useGlobSetting } from '@project/hooks/setting';
import { AxiosProgressEvent } from 'axios';

const { uploadUrl = '' } = useGlobSetting();

/**
 * @description: Upload interface
 */
export function uploadApi(
  params: UploadFileParams,
  onUploadProgress: (progressEvent: AxiosProgressEvent) => void,
) {
  return defHttp.uploadFile<UploadApiResult>(
    {
      url: uploadUrl,
      onUploadProgress,
    },
    params,
  );
}
