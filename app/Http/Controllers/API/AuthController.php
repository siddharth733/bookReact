<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Books;
use App\Models\Personal;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request){
        $validator = Validator::make($request->all() ,[
            'name'=>'required|max:191|unique:users,name'  ,
            'email'=>'required|email|max:191|unique:users,email',
            'password'=>'required|min:8'
        ]);
        if($validator->fails()){
            return response()->json([
                'validation_errors'=>$validator->errors(),
            ]);
        }else{
            $user = User::create([
                'name'=>$request->name,
                'email'=>$request->email,
                'password'=>Hash::make($request->password),
            ]);
            $token = $user->createToken($user->email.'_Token')->plainTextToken;
            return response()->json([
                'status'=>200,
                'username'=>$user->name,
                'id'=>$user->id,
                'role'=>$user->role_as,
                'token'=>$token,
                'message'=>'Register SuccessFully...'
            ]);
        }
    }

    public function login(Request $request){
        $validator = Validator::make($request->all(),[
            'email'=>'required|email|max:191',
            'password'=>'required'
        ]);
        if($validator->fails()){
            return response()->json([
                'validation_errors'=>$validator->errors(),
            ]);
        }else{
            $user = User::where('email',$request->email)->first();
            if(!$user || !Hash::check($request->password,$user->password)){
                return response()->json([
                    'status'=>401,
                    'message'=>"Invalid Credentials",
                ]);
            }else{
                if($user->role_as == 1){
                    $role = 'admin';
                    $token = $user->createToken($user->email.'_AdminToken', ['server:admin'])->plainTextToken;
                }
                else if($user->role_as == 2){
                    $role = 'manager';
                    $token = $user->createToken($user->email.'_ManagerToken', ['server:manager'])->plainTextToken;
                }
                else if($user->role_as == 3){
                    $role = 'author';
                    $token = $user->createToken($user->email.'_AuthorToken', ['server:author'])->plainTextToken;
                }
                else{
                    $role = 'user';
                    $token = $user->createToken($user->email.'_Token',[''])->plainTextToken;
                }
            return response()->json([
                'status'=>200,
                'username'=>$user->name,
                'id'=>$user->id,
                'role'=>$user->role_as,
                'token'=>$token,
                'message'=>'Login SuccessFully...',
                'role' => $role,
            ]);
            }
        }
    }

    public function logout(){
        auth()->user()->tokens()->delete();
        return response()->json([
            'status'=>200,
            'message'=>"Logout Successfully...",
        ]);
    }

    public function salesmanager(Request $request){
        $validator = Validator::make($request->all() ,[
            'name'=>'required|max:191|unique:users,name'  ,
            'email'=>'required|email|max:191|unique:users,email',
            'password'=>'required|min:8',
        ]);
        if($validator->fails()){
            return response()->json([
                'validation_errors'=>$validator->errors(),
            ]);
        }else{
            $user = new User();
            $user->name = $request->name;
            $user->email = $request->email;
            $user->password = Hash::make($request->password);
            $user->role_as = '2';
            $user->save();
            return response()->json([
                'status'=>200,
                'message'=>'Register SuccessFully...'
            ]);
        }
    }
    public function viewsale(){
        $category = User::where('role_as',2)->get();
        return response()->json([
            'status' => 200,
            'category' => $category,
        ]);
    }

    public function deletesale($id){
        $category = User::find($id);
        if($category){
            $category->delete();
            return response()->json([
                'status' => 200,
                'message' => 'User Deleted Successfully',
            ]);
        }else{
            return response()->json([
                'status' => 404,    
                'message' => 'No Category Id Found',
            ]);
        }
    }

    public function editsale($id)
    {
        $category = User::find($id);
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

    public function updatesale(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name'=>'required|max:191',
            'email'=>'required|email|max:191',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->errors(),
            ]);
        } else {
            $category = User::find($id);
            if ($category) {
                $category->name = $request->input('name');
                $category->email = $request->input('email');
                $category->save();
                return response()->json([
                    'status' => 200,
                    'message' => 'Detail Updated Successfully',
                ]);
            }
            else{
                return response()->json([
                    'status' => 404,
                    'message' => 'No Salesmanager Id Found',
                ]);
            }
        }
    }

    public function addauthor(Request $request){
        $user_id = Personal::value('tokenable_id');
        $validator = Validator::make($request->all() ,[
            'name'=>'required|max:191|unique:users,name'  ,
            'email'=>'required|email|max:191|unique:users,email',
            'password'=>'required|min:8',
        ]);
        if($validator->fails()){
            return response()->json([
                'validation_errors'=>$validator->errors(),
            ]);
        }else{
            $user = new User();
            $user->name = $request->name;
            $user->email = $request->email;
            $user->password = Hash::make($request->password);
            $user->role_as = '3';
            $user->meta_id = $user_id;
            $user->save();
            return response()->json([
                'status'=>200,
                'message'=>'Register SuccessFully...'
            ]);
        }
    }

    public function viewauthor(){
        $user_id = Personal::value('tokenable_id');
        $category = User::where('role_as',3)->where('meta_id',$user_id)->get();
        return response()->json([
            'status' => 200,
            'category' => $category,
        ]);
    }

    public function deleteauthor($id){
        $category = User::find($id);
        if($category){
            $category->delete();
            return response()->json([
                'status' => 200,
                'message' => 'User Deleted Successfully',
            ]);
        }else{
            return response()->json([
                'status' => 404,
                'message' => 'No Category Id Found',
            ]);
        }
    }
    
    public function editauthor($id)
    {
        $category = User::find($id);
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

    public function updateauthor(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name'=>'required|max:191',
            'email'=>'required|email|max:191',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'errors' => $validator->errors(),
            ]);
        } else {
            $category = User::find($id);
            if ($category) {
                $category->name = $request->input('name');
                $category->email = $request->input('email');
                $category->save();
                return response()->json([
                    'status' => 200,
                    'message' => 'Detail Updated Successfully',
                ]);
            }
            else{
                return response()->json([
                    'status' => 404,
                    'message' => 'No Salesmanager Id Found',
                ]);
            }
        }
    }
    public function viewauthorwork(){
        $user_id = Personal::value('tokenable_id');
        $category = User::where('role_as',3)->where('meta_id',$user_id)->value('id');
        $books = Books::where('author_id',$category)->get();
        return response()->json([
            'status' => 200,
            'booksData' => $books,
        ]);
    }
    public function allwork(){
        $category = User::where('role_as','3')->pluck('id') ;
        $books = Books::whereIn('author_id',$category)->get();
        return response()->json([
            'status' => 200,
            'booksData' => $books,
        ]);
    }
    public function profile(){
        $user_id = Personal::value('tokenable_id');
        $user = User::where('id',$user_id)->get();
        return response()->json([
            'status' => 200,
            'profile' => $user,
        ]);
    }
    public function dashboard(){
        $user = User::where('role_as','0')->count();
        $admin = User::where('role_as','1')->count();
        $manager = User::where('role_as','2')->count();
        $author = User::where('role_as','3')->count();
        return response()->json([
            'status' => 200,
            'user' => $user,
            'admin' => $admin,
            'manager' => $manager,
            'author' => $author,
        ]);
    }
}