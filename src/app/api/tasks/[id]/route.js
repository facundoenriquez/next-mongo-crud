import { NextResponse } from "next/server";
import { connectDB } from "@/utils/mongoose";
import Task from "@/models/Task";

export async function GET(request, { params }) {
  try {
    connectDB();
    const task = await Task.findById(params.id);
    if (!task)
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    return NextResponse.json(task);
  } catch (error) {
    NextResponse.json(error.message, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  try {
    connectDB();
    const taskDeleted = await Task.findByIdAndDelete(params.id);
    if (!taskDeleted)
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    return NextResponse.json(taskDeleted);
  } catch (error) {
    NextResponse.json(error.message, { status: 400 });
  }
}

export async function PUT(request, { params }) {
  try {
    connectDB();
    const data = await request.json();
    const taskUpdated = await Task.findByIdAndUpdate(params.id, data, {
      new: true,
    });
    return NextResponse.json(taskUpdated);
  } catch (error) {
    NextResponse.json(error.message, { status: 400 });
  }
}
