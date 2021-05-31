import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, CdkDrag } from '@angular/cdk/drag-drop';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';


enum CatalogType {
  private = 'private',
  public = 'public',
  mandatory = 'mandatory'
}

interface Catalog {
  type: CatalogType;
  name: string;
}

/**
 * @title Drag&Drop sort predicate
 */
@Component({
  selector: 'cdk-drag-drop-sort-predicate-example',
  templateUrl: 'cdk-drag-drop-sort-predicate-example.html',
  styleUrls: ['cdk-drag-drop-sort-predicate-example.css']
})
export class CdkDragDropSortPredicateExample {
  CatalogType= CatalogType;

  AvailableCatalogs: Catalog[] = [
    {
      name: 'Emoko',
      type: CatalogType.mandatory
    },
    {
      name: 'Livinx',
      type: CatalogType.private
    },
    {
      name: 'Livinx Premium',
      type: CatalogType.private
    },
    {
      name: 'Livinx Pauvre',
      type: CatalogType.private
    },
    {
      name: 'Ikea',
      type: CatalogType.public
    },
    {
      name: 'Leroy Merlin',
      type: CatalogType.public
    },
    {
      name: 'But',
      type: CatalogType.public
    }
  ];

  search = new FormControl();
  filteredCatalogs: Observable<Catalog[]>;

  publicCatalogs: Catalog[] = [];
  privateCatalogs: Catalog[] = [];

  ngOnInit() {
    this.filteredCatalogs = this.search.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value?.name),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): Catalog[] {
    const filterValue = value?.toLowerCase();

    return this.AvailableCatalogs.filter(
      option =>
        option?.name.toLowerCase().indexOf(filterValue) === 0 &&
        option.type != CatalogType.mandatory &&
        ![...this.publicCatalogs, ...this.privateCatalogs].includes(option)
    );
  }

  displayFn(catalog: Catalog)
  {
    return catalog?.name ?? '';
  }

  addToCatalog() {
    const catalog = this.search.value as Catalog;
    this.search.reset();

    if(catalog.type === CatalogType.private)
    {
      this.privateCatalogs.push(catalog);
    }
    else{      
      this.publicCatalogs.push(catalog);
    }
  }

  removePublic(catalog: Catalog)
  {
    this.publicCatalogs = this.publicCatalogs.filter(c => c.name !== catalog.name)
  }

  removePrivate(catalog: Catalog)
  {
    this.privateCatalogs = this.privateCatalogs.filter(c => c.name !== catalog.name)
  }


  dropPublic(event: CdkDragDrop<Catalog>) {
    moveItemInArray(
      this.publicCatalogs,
      event.previousIndex,
      event.currentIndex
    );
  }

  dropPrivate(event: CdkDragDrop<Catalog>) {
    moveItemInArray(
      this.privateCatalogs,
      event.previousIndex,
      event.currentIndex
    );
  }
}

/**  Copyright 2021 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
