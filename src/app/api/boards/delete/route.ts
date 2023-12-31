import { connect } from "@/dbconfig/dbConfig";
import Board from "@/models/boardModel";
import List from "@/models/listModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { _id } = reqBody;

    // Delete the board by id
    const board = await Board.deleteOne({ _id });

    if (!board) {
      return NextResponse.json({
        message: "Board not found !",
        status: 400,
        success: false,
      });
    }

    // Delete the associated lists
    const lists = await List.deleteMany({ boardId: _id });

    // return the success message
    return NextResponse.json({
      message: "Board deleted successfully !",
      status: 200,
      success: true,
      resultObject: board,
    });
  } catch (error) {
    return NextResponse.json({
      error: error,
      message: "Sorry, something went wrong !",
      status: 500,
      success: false,
    });
  }
}
