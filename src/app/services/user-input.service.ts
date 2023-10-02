import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// import { NotificationsService } from '../../../notifications.service';
import { Funscript } from 'funscript-utils/lib/types';
import { FormBuilder, Validators } from '@angular/forms';

type IVideoAUdioFormat = 'video' | 'audio' | ''

@Injectable({
  providedIn: 'root',
})
export class UserInputService {
  videoURL: BehaviorSubject<string> = new BehaviorSubject<string>('');
  mediaFormat: BehaviorSubject<IVideoAUdioFormat> = new BehaviorSubject<IVideoAUdioFormat>('');
  funscriptFile = new BehaviorSubject<{ name: string; file: Funscript }>({
    name: '',
    file: { actions: [] },
  });

  constructor(
    // private notifications: NotificationsService,
    private formBuilder: FormBuilder
  ) {}

  urlForm = this.formBuilder.group({
    url: [{ value: null, disabled: true }, [Validators.minLength(6)]],
  });

  updateFunscript(file: Funscript, name: string): void {
    let fileName;
    if (name !== undefined) {
      if (!name.includes('.funscript')) {
        name = name + '.funscript';
      }

      fileName = name;
    } else {
      fileName = 'funscript file';
    }

    this.funscriptFile.next({ name: fileName, file });
    // To-DO
    // this.notifications.showToast(`Loaded ${fileName}`, 'success');
  }
}
