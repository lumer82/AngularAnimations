import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { ListItemComponent } from './list-item/list-item.component';
import { MdCardModule, MdListModule } from '@angular/material';
import { ItemService } from '../shared/services/item.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Item } from '../shared/models/item.model';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  let listItem: ListItemComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MdListModule,
        MdCardModule,
        NoopAnimationsModule
      ],
      declarations: [
        ListComponent,
        ListItemComponent
      ],
      providers: [
        ItemService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    listItem = TestBed.createComponent(ListItemComponent).componentInstance;
  });

  describe('Movings', () => {
    it('should move from source to target', () => {
      const element = listItem.elementRef.nativeElement;
      spyOn(element, 'getBoundingClientRect').and.returnValue({ top: 10, left: 10});
      const item = component.source[0];
      expect(item).not.toBeNull();
      component.moveToTarget(item, listItem);
      fixture.detectChanges();
      expect(element.getBoundingClientRect).toHaveBeenCalled();
      expect(component.source.indexOf(item)).toBe(-1, 'item should not be in list anymore');
      expect(component.target.indexOf(item)).toBeGreaterThan(-1);
    })

    it('should move from target to source', () => {
      const element = listItem.elementRef.nativeElement;
      spyOn(element, 'getBoundingClientRect').and.returnValue({ top: 10, left: 10});
      component.target.push(new Item(10, 'testitem'));
      const item = component.target[0];
      expect(item).not.toBeNull();
      component.moveToSource(item, listItem);
      fixture.detectChanges();
      expect(element.getBoundingClientRect).toHaveBeenCalled();
      expect(component.target.indexOf(item)).toBe(-1, 'item should not be in list anymore');
      expect(component.source.indexOf(item)).toBeGreaterThan(-1);
    })
  })

  it('should get correct id', () => {
    const item = new Item(10, 'testitem');
    const id = component.itemid(0, item);
    expect(id).toEqual(item.id);
  })

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
