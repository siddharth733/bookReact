<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Upload;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Http\Request;

class UploadController extends Controller
{
    public function viewImages()
    {
             return view('upload');
    }
    public function uploadImages(Request $request)
    {
        // $uploadedFileUrl = Cloudinary::upload($request->file('file')->getRealPath(),['folder'=>'images',])->getSecurePath();
        // dd($uploadedFileUrl);
        $result = $request->file('file')->storeOnCloudinary('images');
        $ans = $result->getPath();
        $ans1 = $result->getOriginalFileName();
        $upload = new Upload();
        $upload->image_name = "$ans1";
        $upload->image_url = "$ans";
        $upload->save();
    }
}
