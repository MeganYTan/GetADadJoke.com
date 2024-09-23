import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HideElementDirective } from './app-hide-element.directive';

@Component({
    template: '<span [appHideElement]="shouldHideText">Copy</span>',
    imports: [HideElementDirective],
})
class TestComponent {
    shouldHideText: boolean = true;
}

describe('HideElementDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let debugEle: DebugElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TestComponent, HideElementDirective]
        })
            .compileComponents();

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should hide text on medium and smaller screen sizes if shouldHideText is true', () => {
        debugEle = fixture.debugElement.query(By.css('span'));
        expect(debugEle.nativeElement.classList).toContain('d-none');
        expect(debugEle.nativeElement.classList).toContain('d-lg-inline');
    });
    it('should show text on medium and smaller screen sizes if shouldHideText is false', () => {
        component.shouldHideText = false;
        fixture.detectChanges();
        debugEle = fixture.debugElement.query(By.css('span'));
        expect(debugEle.nativeElement.classList).not.toContain('d-none');
        expect(debugEle.nativeElement.classList).not.toContain('d-lg-inline');
    });
});
