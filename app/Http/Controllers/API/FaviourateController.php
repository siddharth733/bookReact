<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Books;
use App\Models\Faviourate;
use App\Models\Personal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

use function PHPUnit\Framework\isEmpty;

class FaviourateController extends Controller
{
    public function store(Request $request,$book){
        $bookData = Books::Where('slug', $book)->value('id');
        $favBook = Faviourate::where('books_id',$bookData)->where('user_id',$request->user_id)->value('id');
        $favBooks = Faviourate::find($favBook);

        if($favBook){
            $favBooks->delete();
            return response()->json([
                'status' => 404,
                'message' => "Book Is Now UnFaviourate",
            ]);
        }else{
            $fav = new Faviourate();
        $fav->books_id = $bookData;
        $fav->user_id = $request->user_id;
        $fav->save();
        return response()->json([
            'status' => 200,
            'message' => "Book Added As Faviourate",
        ]);
        }
    }
    public function view(){
        $userId = request()->cookie('useId');
            $faviourate = Faviourate::where('user_id',$userId)->pluck('books_id');
            $booksData = Books::whereIn('id',$faviourate)->get();
                return response()->json([
                    'status' => 200,
                    'fav_books' => $booksData,
                ]);
    }
    public function cheack($book){
        $bookData = Books::Where('slug', $book)->value('id');
        $user_id = request()->cookie('useId');
        $favBook = Faviourate::where('books_id',$bookData)->where('user_id',$user_id)->value('id');
        if($favBook){
            return response()->json([
                'status' => 404,
            ]);
        }else{
            return response()->json([
                'status' => 200,
            ]);
        }
    }
}
