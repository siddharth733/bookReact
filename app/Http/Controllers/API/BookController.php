<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Books;
use App\Models\Personal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BookController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'category_id'=>'required',
            'meta_title'=>'required',
            'meta_keyword'=>'required',
            'meta_descrip'=>'required',
            'slug'=>'required',
            'name'=>'required',
            'description'=>'required',
        ]);
        if($validator->fails()){
            return response()->json([
                'status' => 422,
                'errors' => $validator->errors(),
            ]);
        }else{
            $imageUpload = cloudinary()->upload($request->file('image')->getRealPath(),['folder'=>'images',])->getSecurePath();
            $fileUpload = cloudinary()->uploadFile($request->file('file')->getRealPath(),['folder'=>'booksData',])->getSecurePath();
            $booksData = new Books();
            $booksData->category_id = $request->input('category_id');
            $booksData->author_id = $request->input('author_id');
            $booksData->meta_title = $request->input('meta_title');
            $booksData->meta_key = $request->input('meta_keyword');
            $booksData->meta_descrip = $request->input('meta_descrip');
            $booksData->slug = $request->input('slug');
            $booksData->name = $request->input('name');
            $booksData->description = $request->input('description');
            $booksData->image = "$imageUpload";
            $booksData->file = "$fileUpload";
            $booksData->save();
            return response()->json([
                'status' => 200,
                'message' => "book stored successfully",
            ]);
        }
    }

    public function view(){
        $user_id = Personal::value('tokenable_id');
        $booksData = Books::where('author_id',$user_id)->get();
        return response()->json([
            'status' => 200,
            'booksData' => $booksData,
        ]);
    }

    public function edit($id){
        $booksData = Books::find($id);
        if ($booksData) {
            return response()->json([
                'status' => 200,
                'booksData' => $booksData,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Book Id Found',
            ]);
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'category_id'=>'required',
            'meta_title'=>'required',
            'meta_key'=>'required',
            'meta_descrip'=>'required',
            'slug'=>'required',
            'name'=>'required',
            'description'=>'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->errors(),
            ]);
        } else {
            $booksData = Books::find($id);
            if ($booksData) {
                $booksData->category_id = $request->input('category_id');
                $booksData->meta_title = $request->input('meta_title');
                $booksData->meta_key = $request->input('meta_key');
                $booksData->meta_descrip = $request->input('meta_descrip');
                $booksData->slug = $request->input('slug');
                $booksData->name = $request->input('name');
                $booksData->description = $request->input('description');
                $booksData->save();
                return response()->json([
                    'status' => 200,
                    'message' => 'Category Updated Successfully',
                ]);
            }
            else{
                return response()->json([
                    'status' => 404,
                    'message' => 'No Category Id Found',
                ]);
            }
        }
    }

    public function delete($id){
        $booksData = Books::find($id);
        if($booksData){
            $booksData->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Category Deleted Successfully',
            ]);
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Category Id Found',
            ]);
        }
    }
}
