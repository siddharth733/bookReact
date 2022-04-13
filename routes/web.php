<?php

use App\Http\Controllers\API\UploadController;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\File\Exception\UploadException;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');



// Route::get('/upload', [App\Http\Controllers\API\UploadController::class, 'home']);
// Route::post('/upload/images', [App\Http\Controllers\API\UploadController::class, 'uploadImages']);

Route::get('upload',[UploadController::class,'viewImages']);
Route::post('upload',[UploadController::class,'uploadImages']);

// Route::get('upload',function(Request $request){
//     return view('upload');
// });

// Route::post('upload',function(Request $request){
//     $uploadedFileUrl = Cloudinary::upload($request->file('file')->getRealPath(),['folder'=>'images',])->getSecurePath();
//     dd($uploadedFileUrl);
// });