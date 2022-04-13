<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Books;
use App\Models\Category;

class FrontendController extends Controller
{
    public function index()
    {
        $data = Category::all();
        return response()->json([
            'status' => 200,
            'category' => $data,
        ]);
    }
    public function view($slug)
    {
        $category = Category::where('slug', $slug)->first();
        if ($category) {
            $booksData = Books::where('category_id', $category->id)->get();
            if ($booksData) {
                return response()->json([
                    'status' => 200,
                    'books_data' => [
                        'books' => $booksData,
                        'category' => $category,
                    ],
                ]);
            } else {
                return response()->json([
                    'status' => 400,
                    'message' => 'No Book Found',
                ]);
            }
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Category Found',
            ]);
        }
    }

    public function detail($book)
    {
        $bookData = Books::Where('slug', $book)->get();
        if ($bookData) {
            return response()->json([
                'status' => 200,
                'books_data' => $bookData,
            ]);
        } else {
            return response()->json([
                'status' => 400,
                'message' => 'No Book Detail Found',
            ]);
        }
    }

    public function read($book)
    {
        $bookData = Books::Where('slug', $book)->get();
        if ($bookData) {
            return response()->json([
                'status' => 200,
                'books_data' => $bookData,
            ]);
        } else {
            return response()->json([
                'status' => 400,
                'message' => 'No Book Detail Found',
            ]);
        }
    }
}
