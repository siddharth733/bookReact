<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'meta_title' => 'required|max:191',
            'meta_keyword' => 'required|max:191',
            'meta_descrip' => 'required|max:191',
            'slug' => 'required|max:191',
            'name' => 'required|max:191|min:3',
            'descrip' => 'required|max:191',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors(),
            ]);
        } else {
            $category = new Category();
            $category->meta_title = $request->input('meta_title');
            $category->meta_keyword = $request->input('meta_keyword');
            $category->meta_descrip = $request->input('meta_descrip');
            $category->slug = $request->input('slug');
            $category->name = $request->input('name');
            $category->description = $request->input('descrip');
            $category->save();
            return response()->json([
                'status' => 200,
                'message' => 'Category Added Successfully',
            ]);
        }
    }

    public function view()
    {
        $category = Category::all();
        return response()->json([
            'status' => 200,
            'category' => $category,
        ]);
    }

    public function edit($id)
    {
        $category = Category::find($id);
        if ($category) {
            return response()->json([
                'status' => 200,
                'category' => $category,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Category Id Found',
            ]);
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'meta_title' => 'required|max:191',
            'meta_keyword' => 'required|max:191',
            'meta_descrip' => 'required|max:191',
            'slug' => 'required|max:191',
            'name' => 'required|max:191|min:3',
            'description' => 'required|max:191',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->errors(),
            ]);
        } else {
            $category = Category::find($id);
            if ($category) {
                $category->meta_title = $request->input('meta_title');
                $category->meta_keyword = $request->input('meta_keyword');
                $category->meta_descrip = $request->input('meta_descrip');
                $category->slug = $request->input('slug');
                $category->name = $request->input('name');
                $category->description = $request->input('description');
                $category->save();
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
        $category = Category::find($id);
        if($category){
            $category->delete();
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

    public function allcategory(){
        $category = Category::all();
        if ($category) {
            return response()->json([
                'status' => 200,
                'category' => $category,
            ]);
        }
    }
}
