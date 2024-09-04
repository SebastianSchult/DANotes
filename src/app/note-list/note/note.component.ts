import { Component, Input } from '@angular/core';
import { Note } from '../../interfaces/note.interface';
import { NoteListService } from '../../firebase-services/note-list.service'
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss'
})
export class NoteComponent {
  @Input() note!:Note;
  edit = false;
  hovered = false;
  
  constructor(private noteService: NoteListService){}

  changeMarkedStatus(){
    this.note.marked = !this.note.marked;
    this.saveNote();
  }

  deleteHovered(){
    if(!this.edit){
      this.hovered = false;
    }
  }

  openEdit(){
    this.edit = true;
  }

  closeEdit(){
    this.edit = false;
    this.saveNote();
  }

  moveToTrash(){
    if(this.note.id){
    this.note.type = 'trash';
    let docId = this.note.id;
    delete this.note.id;
    this.noteService.addNote(this.note, "trash");
    this.noteService.deleteNote("notes", docId);
    }
  }

  moveToNotes() {
    if (this.note.id) {
      this.note.type = 'note';
      const docId = this.note.id; // Store the document ID
  
      // Move the note back to "notes"
      this.noteService.addNote(this.note, 'notes'); // Add the note back to the "notes" collection
      this.noteService.deleteNote('trash', docId); // Delete the note from the "trash" collection
  
      // Optionally save/update the note if needed
      this.saveNote(); 
    } else {
      console.error('Note ID is missing; cannot move to notes.');
    }
  }

  deleteNote() {
    if (this.note.id) {
      this.noteService.deleteNote("trash", this.note.id);
    } 
  }

  saveNote(){
    this.noteService.updateNote(this.note);
  }
}
